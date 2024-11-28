import { Combobox, createListCollection } from "@ParkComponents/combobox";
import { useState } from "react";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

interface ComboBoxComponentProps {
  inputCollection: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

export const ComboBoxComponent: React.FC<ComboBoxComponentProps> = ({
  inputCollection,
  onChange,
}) => {
  const [collection, setCollection] = useState(inputCollection);
  const comboboxCollection = React.useMemo(
    createListCollection({ items: collection }),
    [collection]
  );

  const handleInputChange = ({
    inputValue,
  }: Combobox.InputValueChangeDetails) => {
    const filtered = inputCollection.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setCollection(filtered);
  };

  const handleOpenChange = () => {
    setCollection(inputCollection);
  };

  const handleItemSelect = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const selectedItem = event.currentTarget.dataset.item;
    if (selectedItem) {
      const { value } = JSON.parse(selectedItem);
      onChange?.(value);
    }
  };

  return (
    <Combobox.Root
      w="100%"
      collection={comboboxCollection}
      onSelect={handleItemSelect}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
    >
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Select a Framework" asChild>
          <Input />
        </Combobox.Input>
        <Combobox.Trigger asChild>
          <IconButton variant="link" aria-label="open" size="xs">
            <ChevronsUpDownIcon />
          </IconButton>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          {collection.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              <Combobox.ItemText>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <CheckIcon />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};
