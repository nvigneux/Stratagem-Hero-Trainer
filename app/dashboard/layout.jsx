/* eslint-disable react/require-default-props */
// Migrating from the pages directory: The root Layout replaces the _app.js and _document.js files.

// Templates are similar to layouts in that they wrap each child layout or page.
// Unlike layouts that persist across routes and maintain state,
// templates create a new instance for each of their children on navigation.

// Since streaming is server-rendered, it does not impact SEO.

// A route group can be created by wrapping a folder's name in parenthesis: (folderName)
// This indicates the folder is for organizational purposes and should
// not be included in the route's URL path.

// Private folders can be created by prefixing a folder with an underscore: _folderName

// Parallel routes are created using named slots. Slots are defined with the @folder

import PropTypes from 'prop-types';

// Components
import Navigation from './components/Navigation/Navigation';

function Layout({
  children, team, analytics, auth,
}) {
  return (
    <section>
      <Navigation />
      <div className="padding-l">
        {children}
      </div>
      <div className="margin-m flex flex-row">
        <div className="margin-m">
          {team}
        </div>
        <div className="margin-m">
          {analytics}
        </div>
      </div>
      {auth}
    </section>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  team: PropTypes.node,
  analytics: PropTypes.node,
  auth: PropTypes.node,
};

export default Layout;
