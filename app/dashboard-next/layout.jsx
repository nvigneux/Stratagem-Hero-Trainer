import PropTypes from 'prop-types';
// Components
import SideNav from '../ui/components/atoms/SideNav/SideNav';
import SideNavLayout from '../ui/components/templates/SideNavLayout/SideNavLayout';

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
