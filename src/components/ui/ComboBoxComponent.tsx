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
  const initialCollection = createListCollection({ items: inputCollection });
  const [collection, setCollection] = useState(initialCollection);

  const handleInputChange = ({
    inputValue,
  }: Combobox.InputValueChangeDetails) => {
    const filtered = initialCollection.items.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setCollection(
      filtered.length > 0
        ? createListCollection({ items: filtered })
        : initialCollection
    );
  };

  const handleOpenChange = () => {
    setCollection(initialCollection);
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
      collection={collection}
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
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};
