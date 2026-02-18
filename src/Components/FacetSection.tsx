import React, { useState } from "react";
import styled from "styled-components";
import { FacetCheckbox } from "./FacetCheckbox";

export interface FacetItem {
  id: number;
  label: string;
  count: number;
}

interface Props {
  title: string;
  items: FacetItem[];
  selectedIds: number[];
  isLoading?: boolean;
  onToggle: (id: number) => void;
}

const Section= styled.div`
  margin-bottom: 1.8rem;
  &:last-child { margin-bottom: 0; }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  color: #333;
  flex-grow: 1;
`;

const ToggleIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  font-size: 1.2rem;
  color: #666;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;

const ItemsList = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
`;

const EmptyState = styled.div`
  color: #999;
  font-size: 0.9rem;
  padding: 8px 0;
  font-style: italic;
`;

const SkeletonItem = styled.div`
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const FacetSection: React.FC<Props> = ({
  title,
  items,
  selectedIds,
  isLoading = false,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const validItems = items.filter((item) => item.label && item.label.trim() !== "");

  return (
    <Section>
      <SectionHeader onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <SectionTitle>{title}</SectionTitle>
        <ToggleIcon isOpen={isOpen}>▼</ToggleIcon>
      </SectionHeader>

      <ItemsList isOpen={isOpen}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
        ) : validItems.length > 0 ? (
          validItems.map((item) => (
            <FacetCheckbox
              key={item.id}
              label={item.label}
              count={item.count}
              checked={selectedIds.includes(item.id)}
              onChange={() => onToggle(item.id)}
            />
          ))
        ) : (
          <EmptyState>No {title.toLowerCase()}</EmptyState>
        )}
      </ItemsList>
    </Section>
  );
};

export default FacetSection;