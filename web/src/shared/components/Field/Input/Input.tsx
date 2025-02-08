import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, FC, memo } from "react";
import { Field } from "formik";

interface InputProps extends ChakraInputProps {
  label?: string;
  inputLeftElement?: ChakraInputProps["children"];
  inputRightElement?: ChakraInputProps["children"];
  hasError?: boolean;
}

const Input: FC<InputProps> = memo(({ label, inputLeftElement, inputRightElement, hasError, ...inputProps }) => {
  const [isShowPasswordIcon, setShowPasswordIcon] = useState(false);

  return (
    <FormControl isInvalid={hasError} mt={4} className="input">
      <Flex flexDirection="column">
        {label && (
          <FormLabel
            position="absolute"
            bottom="32px"
            left="10px"
            p="0 8px"
            bg="white"
            textStyle="label"
            fontSize="12px"
            zIndex={10}
            color={hasError ? "errorColor" : undefined}
          >
            {label}
          </FormLabel>
        )}
        <InputGroup position="relative">
          <Field
            as={ChakraInput}
            {...inputProps}
            type={isShowPasswordIcon ? "text" : inputProps.type}
            _focusVisible={{ boxShadow: "transparent", borderColor: hasError ? "errorColor" : undefined }}
            variant="outline"
            bg="white"
            height="48px"
            borderRadius="base"
          />
          {inputProps.type === "password" && (
            <InputRightElement display="flex" h="99%" w="45px" alignItems="center" justifyContent="center">
              <IconButton
                minHeight="20px"
                bg="transparent"
                aria-label={isShowPasswordIcon ? "Hide password" : "Show password"}
                icon={isShowPasswordIcon ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPasswordIcon(!isShowPasswordIcon)}
                _hover={{
                  background: "transparent",
                }}
              />
            </InputRightElement>
          )}
          {inputLeftElement && (
            <InputLeftElement display="flex" h="100%" w="35px" alignItems="center" justifyContent="center">
              {inputLeftElement}
            </InputLeftElement>
          )}

          {inputRightElement && (
            <InputRightElement display="flex" h="100%" w="35px" alignItems="center" justifyContent="center">
              {inputRightElement}
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
    </FormControl>
  );
});

export default Input;
