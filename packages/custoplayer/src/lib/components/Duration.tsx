import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { formattedDurationAtom, myScope } from '../atoms';

function Duration() {
  const formattedDuration = useAtomValue(formattedDurationAtom, myScope);
  // When the length is < 60 minutes the length is 5 otherwise it is 7
  return (
    <TimeText
      $isLargerThan60Minutes={formattedDuration.length === 7}
      data-cy='duration'
    >
      {formattedDuration}
    </TimeText>
  );
}

const TimeText = styled.span<{ $isLargerThan60Minutes: boolean }>`
  color: currentColor;
  text-align: center;
  width: ${(props) => (props.$isLargerThan60Minutes ? '59px' : '45px')};
`;

export default Duration;
