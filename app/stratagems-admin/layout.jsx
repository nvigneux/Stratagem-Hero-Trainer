import PropTypes from 'prop-types';

// Components
import StratagemFormLayout from './components/StratagemFormLayout';

export default function Layout({ children }) {
  return (
    <StratagemFormLayout>
      {children}
    </StratagemFormLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
