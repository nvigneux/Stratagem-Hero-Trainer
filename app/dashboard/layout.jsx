import PropTypes from 'prop-types';
// Components
import SideNav from '../ui/atoms/SideNav/SideNav';
import SideNavLayout from '../ui/templates/SideNavLayout/SideNavLayout';

export default function Layout({ children }) {
  return (
    <SideNavLayout sidebar={<SideNav />}>
      {children}
    </SideNavLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
