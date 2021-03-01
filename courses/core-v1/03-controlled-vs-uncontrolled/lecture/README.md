# Notes for Instructor

When it comes to inputs, there are two types of them, "uncontrolled" and "controlled" inputs.

In practical terms, an uncontrolled component is one whose value is changed exclusively by the _user interacting with it_. The state of that component is managed by the browser, and React doesn't care about its state after the initial render.

You can still set the initial state of an uncontrolled component with `defaultValue` (and `defaultChecked` for checkbox and radio inputs).

A controlled component is one that does not own its state, but rather its state is controlled by the component that rendered it.

In practical terms it means the state is controlled exclusively by the _programmer_.
