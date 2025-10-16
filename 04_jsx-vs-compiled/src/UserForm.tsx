import { useState } from 'react';
import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';
import { Button } from './Button';
import './UserForm.css';

// Component written WITHOUT JSX - using compiled _jsxs directly
// This is what your JSX gets compiled to!
export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email) {
      setSubmitted(true);
      console.log('Form submitted:', { name, email });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubmitted(false);
  };

  // Using _jsxs (multiple children) and _jsx (single child or self-closing)
  return _jsxs('div', {
    className: 'user-form',
    children: [
      _jsx('h2', {
        children: 'User Registration'
      }),

      !submitted
        ? _jsxs('div', {
            className: 'form-content',
            children: [
              _jsxs('div', {
                className: 'form-group',
                children: [
                  _jsx('label', {
                    htmlFor: 'name',
                    children: 'Name:'
                  }),
                  _jsx('input', {
                    id: 'name',
                    type: 'text',
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: 'Enter your name'
                  })
                ]
              }),

              _jsxs('div', {
                className: 'form-group',
                children: [
                  _jsx('label', {
                    htmlFor: 'email',
                    children: 'Email:'
                  }),
                  _jsx('input', {
                    id: 'email',
                    type: 'email',
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: 'Enter your email'
                  })
                ]
              }),

              _jsxs('div', {
                className: 'form-actions',
                children: [
                  // Using the JSX Button component within the _jsx compiled code
                  _jsx(Button, {
                    label: 'Submit',
                    onClick: handleSubmit,
                    variant: 'primary',
                    disabled: !name || !email
                  }),
                  _jsx(Button, {
                    label: 'Reset',
                    onClick: handleReset,
                    variant: 'secondary'
                  })
                ]
              })
            ]
          })
        : _jsxs('div', {
            className: 'success-message',
            children: [
              _jsx('h3', {
                children: 'Registration Successful!'
              }),
              _jsxs('p', {
                children: ['Welcome, ', _jsx('strong', { children: name }), '!']
              }),
              _jsxs('p', {
                children: ['We sent a confirmation to ', _jsx('strong', { children: email })]
              }),
              _jsx(Button, {
                label: 'Register Another',
                onClick: handleReset,
                variant: 'primary'
              })
            ]
          })
    ]
  });
}
