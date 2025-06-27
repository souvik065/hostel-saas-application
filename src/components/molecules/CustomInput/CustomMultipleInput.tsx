import React from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewInputField, CrewIcon } from '../../atoms/';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import './CustomMultipleInput.scss';

interface CustomMultipleInputProps {
  formData: { [key: string]: any }[];
  errors: { [key: string]: any };
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  label: string;
  namePrefix: string;
  itemName: string;
  labelVariant:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
}

const CustomMultipleInput = ({
  formData,
  errors,
  onChange,
  onAdd,
  onRemove,
  label,
  namePrefix,
  itemName,
  labelVariant,
}: CustomMultipleInputProps) => (
  <Stack spacing={2}>
    {formData.map((item, index) => (
      <Grid key={index} container>
        <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
          <CrewInputField
            type="text"
            label={label}
            labelVariant={labelVariant}
            placeholder={`${label}`}
            value={item[itemName]}
            onValueChange={(e) => onChange(index, e)}
            radius={8}
            fullWidth
            name={`${namePrefix}[${index}].${itemName}`}
            id={`${namePrefix}-${index}-${itemName}`}
            error={!!errors && !!errors[index]?.[itemName]}
            errorMessage={errors?.[index]?.[itemName]}
          />
        </Grid>
        <Stack className="icon-container" spacing={2} direction={'row'}>
          {formData.length > 1 && (
            <Stack className="icon" component={'span'} onClick={() => onRemove(index)}>
              <CrewIcon icon={faSquareMinus} />
            </Stack>
          )}
          {index === formData.length - 1 && (
            <Stack className="icon" component={'span'} onClick={onAdd}>
              <CrewIcon icon={faSquarePlus} />
            </Stack>
          )}
        </Stack>
      </Grid>
    ))}
  </Stack>
);

export default CustomMultipleInput;
