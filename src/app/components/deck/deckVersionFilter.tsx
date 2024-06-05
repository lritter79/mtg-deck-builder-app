'use client';
interface DeckVersion {
  created_at: string | null;
  deck_id: number | null;
  id: string;
  losses: number | null;
  wins: number | null;
}

interface DeckVersionFilterProps {
  versions: DeckVersion[] | null;
  setDeckVersion: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue: string | null;
}

const DeckVersionFilter: React.FC<DeckVersionFilterProps> = ({
  versions,
  setDeckVersion,
  defaultValue,
}) => {
  // Create a sorted array of versions based on the 'created_at' property
  const sortedVersions = versions
    ? [...versions].sort((a, b) => {
        if (a.created_at && b.created_at) {
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );
        }
        return 0;
      })
    : [];

  // Handle the change event of the dropdown and call the setDeckVersion callback
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeckVersion(event.target.value);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="version"
        className="block text-sm font-medium text-gray-700"
      >
        Select Version
      </label>
      <select
        id="version"
        name="version"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={handleChange}
        defaultValue={defaultValue || undefined}
      >
        <option value="">Select a Version</option>
        {sortedVersions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckVersionFilter;
