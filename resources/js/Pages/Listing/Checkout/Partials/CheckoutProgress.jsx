import React from 'react';

const ProgressStep = ({ currentStep, setCurrentStep }) => {
    const steps = [
        { id: 1, title: 'Dostawa' },
        { id: 2, title: 'Płatność' },
        { id: 3, title: 'Podsumowanie' },
    ];

    return (
        <div className="flex justify-center items-center p-4 w-full">
            <ol className="flex items-center w-full relative">
                {steps.map((step, index) => (
                    <li key={step.id} className="flex flex-col items-center w-full relative">
                        <span
                            className={`flex items-center justify-center w-12 h-12 rounded-full  cursor-pointer text-lg font-bold  ${currentStep > step.id
                                ? 'bg-indigo-500 text-white'
                                : currentStep === step.id
                                    ? 'bg-gray-100 text-indigo-600  border-2 border-indigo-600'
                                    : 'bg-gray-300 text-gray-600'
                                }`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            {step.id}
                        </span>
                        <p className={`font-medium mt-2 ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                            {step.title}
                        </p>
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute w-full h-1 -m-4 ${currentStep > step.id
                                    ? 'bg-indigo-500'
                                    : 'bg-gray-300'
                                    }`}
                                style={{
                                    left: '50%',
                                    top: 'calc(20px + 20px)',
                                    zIndex: -1
                                }}
                            />
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ProgressStep;
