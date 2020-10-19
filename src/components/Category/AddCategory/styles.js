import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import { respondTo } from '../..//../Utils/mixins';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  min-width: 500px;
  ${respondTo.mobile`
 min-width: 200px;
 max-width:300px;
`};
`;
export const CustomCard = styled(Card)`
  padding: 20px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 14px -2px rgba(210, 211, 214, 1);
  -moz-box-shadow: 0px 0px 14px -2px rgba(210, 211, 214, 1);
  box-shadow: 0px 0px 14px -2px rgba(210, 211, 214, 1);
  width: 350px;
  height: 100%;

  ${respondTo.mobile`
  padding: 0px;
   width:100%;
     height: 300px;


`};
`;
