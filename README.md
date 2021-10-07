# Summary
## Animation
## Keyframes
## Variants
## Gesture animation
## Darg
## Motion Values
## Viewport scroll
## Exit animation
## More
### UI patterns
### Techniques
### Third-party libraries
#### React Router 
#### Styled Components
```js
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  background: white;
  border-radius: 30px;
  width: 150px;
  height: 150px;
`;

export const Example = () => <Box animate={{ scale: 2 }} />;

```
