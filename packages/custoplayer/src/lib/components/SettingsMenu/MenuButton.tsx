import { StyledMenuButton } from './styles';

function traverseListUsingKeys(e: React.KeyboardEvent<HTMLButtonElement>) {
  if (e.key === 'ArrowUp') {
    const listItem = (e.target as HTMLButtonElement).parentElement;
    const previousListItem = listItem?.previousElementSibling as HTMLElement;

    if (previousListItem) {
      const previousButton =
        previousListItem.firstElementChild as HTMLButtonElement;
      previousButton.focus();
    }
    // Reached top of list
    else {
      const lastListItem = listItem?.parentElement?.lastElementChild;
      if (lastListItem) {
        const lastButton = lastListItem.firstElementChild as HTMLButtonElement;
        lastButton.focus();
      }
    }
  } else if (e.key === 'ArrowDown') {
    const listItem = (e.target as HTMLButtonElement).parentElement;
    const nextListItem = listItem?.nextElementSibling as HTMLElement;
    if (nextListItem) {
      const nextButton = nextListItem.firstElementChild as HTMLButtonElement;
      nextButton.focus();
    }
    // Reached bottom of list
    else {
      const firstListItem = listItem?.parentElement?.firstElementChild;
      if (firstListItem) {
        const firstButton =
          firstListItem.firstElementChild as HTMLButtonElement;
        firstButton.focus();
      }
    }
  }
}

function MenuButton({
  settingsMenuColor,
  onClick,
  dataCy,
  children,
}: {
  onClick: () => void;
  settingsMenuColor: string | undefined;
  dataCy: string;
  children: React.ReactNode;
}) {
  return (
    <StyledMenuButton
      onKeyDown={traverseListUsingKeys}
      data-cy={dataCy}
      onClick={onClick}
      settingsMenuColor={settingsMenuColor}
      layout='position'
    >
      {children}
    </StyledMenuButton>
  );
}

export default MenuButton;
