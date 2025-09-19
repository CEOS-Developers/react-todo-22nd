import styled from 'styled-components';

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin: 15% auto;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export const ModalHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 15px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.large} ${({ theme }) => theme.borderRadius.large} 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

export const CloseButton = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const TodoList = styled.div`
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`;

export const TodoItem = styled.div<{ $completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 10px;
  background: ${({ theme, $completed }) => 
    $completed ? theme.colors.gray : theme.colors.lightGray
  };
`;

export const TodoText = styled.div<{ $completed: boolean }>`
  flex: 1;
  text-align: left;
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  color: ${({ theme, $completed }) => 
    $completed ? theme.colors.text.disabled : theme.colors.text.primary
  };
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 5px;
`;

export const ActionButton = styled.button<{ $variant: 'complete' | 'delete' }>`
  background: ${({ theme, $variant }) => 
    $variant === 'complete' ? theme.colors.primary : theme.colors.red
  };
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    opacity: 0.8;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TodoInput = styled.input`
  width: 210px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AddButton = styled.button`
  width: 80px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;