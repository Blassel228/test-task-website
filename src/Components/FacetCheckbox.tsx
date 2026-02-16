import React from "react";
import styled from "styled-components";

interface FacetCheckboxProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Count = styled.span`
  margin-left: auto;
  color: #666;
  font-size: 14px;
`;

export const FacetCheckbox: React.FC<FacetCheckboxProps> = ({
  label,
  count,
  checked,
  onChange
}) => {
  return (
    <CheckboxContainer>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
      <Count>({count})</Count>
    </CheckboxContainer>
  );
};