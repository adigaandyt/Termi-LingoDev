import { Stepper,Step,ConnectorStyleProps } from 'react-form-stepper';

function RegisterStepper({activeStep}){
    const defaultStepStyle = {
        activeBgColor: '#fa976c', // set the default size for steps
        completedBgColor: '#11e980',
        
      };

    return(<>
        <div dir='ltr'>
        <Stepper activeStep={activeStep}  styleConfig={defaultStepStyle}>
            <Step circleFontSize='2rem' label="e-mail"  />
            <Step label="Validation" />
            <Step label="Password" />
            <Step label="Details" />
        </Stepper>
        </div>
    </>)
}
export default RegisterStepper