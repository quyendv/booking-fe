import SideBar from '~/components/layouts/sidebar/SideBar';

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  return (
    <div className="flex h-full w-full border-collapse flex-row">
      <SideBar />
      <div className="flex-1 p-16">Page</div>
    </div>
  );
}
