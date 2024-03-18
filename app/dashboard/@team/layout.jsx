import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div className="bg-taupe padding-l">{children}</div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
