import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <p>Admin Stratagems</p>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
