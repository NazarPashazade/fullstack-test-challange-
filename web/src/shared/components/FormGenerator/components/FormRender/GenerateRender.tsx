import React from "react";
import { FieldArray, FieldArrayRenderProps, useFormikContext } from "formik";
import { Box, Button, Center, Flex, FlexProps } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { FieldsMap } from "../../constants";
import { FieldItemType, RenderTypes } from "../../interfaces";

import { getObjectPropertyValue } from "@shared/utils";
import { TFieldItem } from "@shared/components";
import { AnyType } from "@shared/interfaces";

export interface RenderFieldType {
  type: FieldItemType.RENDER;
  name: string;
  renderType: RenderTypes;
  containerStyles?: FlexProps;
  fields?: TFieldItem[];
  isFieldArray?: boolean;
}

// Render Field Item
export const RenderField = (options: {
  field: TFieldItem;
  index: number;
  formikFieldArrayHelpers?: FieldArrayRenderProps;
}) => {
  const { field, index, formikFieldArrayHelpers } = options;

  if (field.type === FieldItemType.RENDER) {
    return RenderFields({ field: field as RenderFieldType, index });
  }

  const FieldComponent = FieldsMap.get(field.type);
  if (!FieldComponent) {
    return null;
  }

  return <FieldComponent key={`${field.name}${index}`} {...field} formikFieldArrayHelpers={formikFieldArrayHelpers} />;
};

// Render Fields
export const RenderFields = (options: {
  field: RenderFieldType;
  index: number;
  formikFieldArrayHelpers?: FieldArrayRenderProps;
}) => {
  const { field, index, formikFieldArrayHelpers } = options;

  if (!field.fields) {
    return null;
  }

  if (field.isFieldArray) {
    return RenderFieldArray({
      fieldItem: { ...field, isFieldArray: false },
    });
  }

  switch (field.renderType) {
    case RenderTypes.FIELD_LIST_ROW: {
      return (
        <Flex w="100%" {...field?.containerStyles} flexDir="row" key={field.name}>
          {field.fields.map((f) => {
            const input = RenderField({
              field: f,
              index,
              formikFieldArrayHelpers,
            });

            return (
              <Box w="100%" key={f.name}>
                {input}
              </Box>
            );
          })}
        </Flex>
      );
    }
    case RenderTypes.FIELD_LIST_COLUMN: {
      return (
        <Flex w="100%" {...field?.containerStyles} flexDir="column" key={field.name}>
          {field.fields.map((f) => {
            const input = RenderField({
              field: f,
              index,
              formikFieldArrayHelpers,
            });

            return (
              <Box w="100%" key={f.name}>
                {input}
              </Box>
            );
          })}
        </Flex>
      );
    }
    default:
      return null;
  }
};

// Render FieldArray
export const RenderFieldArray = (options: { fieldItem: TFieldItem }) => {
  const { fieldItem } = options;

  const { name } = fieldItem;
  const { values } = useFormikContext();

  const getField = (index: number, formikFieldArrayHelpers: FieldArrayRenderProps) => {
    const parentFieldName = `${name}.${index}`;
    const childFields = ((fieldItem as RenderFieldType).fields || []).map((f) => ({
      ...f,
      name: `${parentFieldName}.${f.name}`,
    }));

    return RenderField({
      field: { ...fieldItem, fields: childFields, name: parentFieldName, index } as unknown as TFieldItem,
      index,
      formikFieldArrayHelpers,
    });
  };

  return (
    <FieldArray
      key={name}
      name={name}
      render={(formikFieldArrayHelpers) => {
        return (
          <>
            {(getObjectPropertyValue(values, name) || []).map((_: AnyType, index: number) => {
              return (
                <Flex w="100%" alignItems="center" key={name}>
                  <Flex w="calc(100% - 48px)">{getField(index, formikFieldArrayHelpers)}</Flex>
                  <Flex>
                    <Button
                      variant="secondaryOutlined"
                      color="errorColor"
                      borderColor="errorColor"
                      padding="0"
                      w="48px"
                      onClick={() => formikFieldArrayHelpers.remove(index)}
                    >
                      <Center>
                        <DeleteIcon h="15px" w="15px" />
                      </Center>
                    </Button>
                  </Flex>
                </Flex>
              );
            })}
            <Flex w="100%" justifyContent="flex-end">
              <Button onClick={() => formikFieldArrayHelpers.push({})}>Add</Button>
            </Flex>
          </>
        );
      }}
    />
  );
};
