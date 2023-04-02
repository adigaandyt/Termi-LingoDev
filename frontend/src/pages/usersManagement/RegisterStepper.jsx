import { Stepper,Step,ConnectorStyleProps } from 'react-form-stepper';
import {MdAlternateEmail} from 'react-icons/md'
import {GrValidate} from 'react-icons/gr'
import {RiLockPasswordLine} from 'react-icons/ri'
import {TbListDetails} from 'react-icons/tb'
function RegisterStepper({activeStep}){
    const defaultStepStyle = {
        activeBgColor: '#fa976c', // set the default size for steps
        completedBgColor: '#11e980',
        inactiveTextColor:'#000000',
        completedTextColor:'#000000',
        activeTextColor:'#000000',

      };

    return(<>
        <div dir='ltr'>
        <Stepper activeStep={activeStep}  styleConfig={defaultStepStyle}>
            <Step circleFontSize='2rem' label="e-mail"  ><MdAlternateEmail/></Step>
            <Step label="Validation" ><GrValidate/></Step>
            <Step label="Password" ><RiLockPasswordLine/></Step>
            <Step label="Details" ><TbListDetails/></Step>
        </Stepper>
        </div>
    </>)
}
export default RegisterStepper