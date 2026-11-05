"""Require an owner review on the exact head commit before activating changed codes."""
import json
import os
import subprocess
from urllib.request import Request, urlopen


def check(before, after, approved):
    previous = {row['id']: row for row in before}
    protected = ('name', 'group', 'category_id', 'code', 'verification', 'enabled', 'experimental')
    for row in after:
        old = previous.get(row['id'], {})
        changed = any(row.get(key) != old.get(key) for key in protected)
        if row['verification'] == 'verified' and changed and not approved:
            raise ValueError(f"Owner approval required on current head: {row['name']}")


def main():
    event = json.load(open(os.environ['GITHUB_EVENT_PATH']))
    pr = event['pull_request']
    repo = os.environ['GITHUB_REPOSITORY']
    owner = os.environ.get('STRATAGEM_APPROVER') or repo.split('/')[0]
    url = f"https://api.github.com/repos/{repo}/pulls/{pr['number']}/reviews?per_page=100"
    reviews = []
    while url:
        request = Request(url, headers={'Authorization': 'Bearer ' + os.environ['GH_TOKEN'],
                                      'Accept': 'application/vnd.github+json'})
        with urlopen(request, timeout=20) as response:
            reviews.extend(json.load(response))
            import re
            match = re.search(r'<([^>]+)>; rel="next"', response.headers.get('Link', ''))
            url = match[1] if match else None
    # Dismissals and later change requests revoke an earlier approval.
    relevant = [r for r in reviews if r['user']['login'].casefold() == owner.casefold()
                and r['state'] in {'APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'}]
    latest = relevant[-1] if relevant else None
    approved = bool(latest and latest['state'] == 'APPROVED'
                    and latest['commit_id'] == pr['head']['sha'])
    path = 'app/lib/sync/catalog.json'
    result = subprocess.run(['git', 'show', pr['base']['sha'] + ':' + path],
                            capture_output=True, text=True)
    before = json.loads(result.stdout) if result.returncode == 0 else []
    check(before, json.load(open(path)), approved)


if __name__ == '__main__':
    main()
