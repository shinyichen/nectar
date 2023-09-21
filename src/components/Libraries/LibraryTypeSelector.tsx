import { LibraryType, Select, SelectOption } from '@components';

const libraryTypes: SelectOption<LibraryType>[] = [
  {
    id: 'owner',
    label: 'Owner',
    value: 'owner',
  },
  {
    id: 'collab',
    label: 'Collaborator',
    value: 'collab',
  },
  // {
  //   id: 'follow',
  //   label: 'Following',
  //   value: 'follow',
  // },
];

export const LibraryTypeSelector = ({
  type,
  onChange,
}: {
  type: LibraryType;
  onChange: (type: LibraryType) => void;
}) => {
  const option = libraryTypes.find((t) => t.id === type);
  const handleOnChange = (value: SelectOption<LibraryType>) => {
    onChange(value.id);
  };

  return (
    <Select<SelectOption<LibraryType>>
      name="library-type"
      label="Library Type"
      hideLabel={true}
      id="lib-type-select"
      options={libraryTypes}
      value={option}
      onChange={handleOnChange}
      stylesTheme="default"
      // isDisabled={props.isLoading}
    />
  );
};
