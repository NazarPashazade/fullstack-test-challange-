import React, { FC, useCallback, useEffect, useState } from "react";
import { InputGroup, InputLeftElement, Input, InputRightElement } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

import { useDebounce } from "@shared/hooks";

export interface InputSearchProps extends React.HTMLProps<HTMLInputElement> {
  onChangeSearch: (value: string) => void;
  showClearText?: boolean;
}

const InputSearch: FC<InputSearchProps> = ({ onChangeSearch, value }) => {
  const [inputValue, setInputValue] = useState<string>(value ? String(value) : "");

  const debounceValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    setInputValue(value ? String(value) : "");
  }, [value]);

  useEffect(() => {
    if (debounceValue !== value && debounceValue !== undefined) {
      onChangeSearch(debounceValue);
    }
  }, [debounceValue, onChangeSearch, inputValue, value]);

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  return (
    <InputGroup bg="white" borderRadius="base" minWidth="40%">
      <InputLeftElement h="48px" pointerEvents="none" children={<SearchIcon color="hintColor" />} />
      <Input
        h="48px"
        value={inputValue}
        onChange={onChangeInput}
        placeholder="Search"
        focusBorderColor="inputFocusBorderColor"
      />
      <InputRightElement h="48px">
        {inputValue && <CloseIcon color="hintColor" cursor="pointer" w="12px" onClick={() => setInputValue("")} />}
      </InputRightElement>
    </InputGroup>
  );
};

export default InputSearch;
