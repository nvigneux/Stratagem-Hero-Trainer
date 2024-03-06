import PropTypes from 'prop-types';

export default function Page({ params }) {
  return <div>{`My category: ${params.slug}`}</div>;
}

Page.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
