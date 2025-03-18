import { Toaster } from 'react-hot-toast';

const ToastComponent = () => {
    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                removeDelay: 1000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },

                // Default options for specific types
                success: {
                    duration: 8000,
                    iconTheme: {
                        primary: '#008236',
                        secondary: 'white',
                    },
                    style: {
                        background: 'white',
                        color: '#008236',
                        padding: '20px',
                        border: '1px solid #008236',
                    },
                },

                error: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#db3055',
                        secondary: 'white',
                    },
                    style: {
                        background: 'white',
                        color: '#db3055',
                        padding: '20px',
                        border: '1px solid #db3055',
                    },
                },
            }}
        />
    );
}

export default ToastComponent;