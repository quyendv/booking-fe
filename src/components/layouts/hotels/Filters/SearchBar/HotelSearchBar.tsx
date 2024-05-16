interface HotelSearchBarProps {}

export default function HotelSearchBar({}: HotelSearchBarProps) {
  return (
    <div className="search-bar-shadow flex space-x-3 rounded-full px-8 py-4">
      <div>Location</div>
      <div>TimeRange</div>
      <div>People</div>
    </div>
  );
}
