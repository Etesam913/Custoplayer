import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { formattedCurrentTimeAtom, myScope } from '@root/lib/atoms';

function CurrentTime() {
  const formattedCurrentTime = useAtomValue(formattedCurrentTimeAtom, myScope);
  // When the length is < 60 minutes the length is 5 otherwise it is 7

  return (
    <TimeText isLargerThan60Minutes={formattedCurrentTime.length === 7}>
      {formattedCurrentTime}
    </TimeText>
  );
}

const TimeText = styled.span<{ isLargerThan60Minutes: boolean }>`
  color: currentColor;
  width: ${(props) => (props.isLargerThan60Minutes ? '59px' : '45px')};
  text-align: center;
`;

export default CurrentTime;
