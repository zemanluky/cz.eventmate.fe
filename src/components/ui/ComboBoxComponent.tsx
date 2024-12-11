import { Combobox, createListCollection } from "@ParkComponents/combobox";
import { useState } from "react";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

interface ComboBoxComponentProps {
  inputCollection: { label: string; value: string }[];
  onChange?: (value: string) => void;
  label: string;
  placeholder: string;
  defaultValue?: string;
}

export const ComboBoxComponent: React.FC<ComboBoxComponentProps> = ({
  inputCollection,
  label,
  placeholder,
  onChange,
  defaultValue,
}) => {
  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [collection, setCollection] = useState(inputCollection);
  const [inputValue, setInputValue] = useState(
    defaultValue ? capitalizeFirstLetter(defaultValue) : ""
  );

  const comboboxCollection = React.useMemo(
    () => createListCollection({ items: collection }),
    [collection]
  );

  React.useEffect(() => {
    if (defaultValue) {
      const filtered = inputCollection.filter((item) =>
        item.label.toLowerCase().includes(defaultValue.toLowerCase())
      );
      setCollection(filtered);
    } else {
      setCollection(inputCollection);
    }
  }, [defaultValue, inputCollection]);

  const handleInputChange = ({
    inputValue,
  }: Combobox.InputValueChangeDetails) => {
    setInputValue(inputValue);
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
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input value={inputValue} placeholder={placeholder} asChild>
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
            <Combobox.Item
              key={item.value}
              item={item}
              onClick={() => onChange?.(item.value)}
            >
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
