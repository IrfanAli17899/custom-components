import React, { ElementType } from "react";
import { ComponentPropsWithoutRef } from "react";

type ValidTags = ElementType;

type CustomTagProps<T extends ValidTags> = {
  tag?: T | ValidTags;
} & (ComponentPropsWithoutRef<T>);

const DynamicComponent = <T extends ValidTags>({
  tag: Tag = "div",
  ...elementProps
}: CustomTagProps<T>): JSX.Element => {
  return <Tag {...elementProps} />;
};

export default DynamicComponent;


// // Example starts here
// const AnotherComponent = () => <div>Im a React component!@</div>;

// export default function App() {
//   return (
//     <div className="App">
//       <DynamicComponent tag="textarea">
//         Button Content
//       </DynamicComponent>
//       <DynamicComponent>Is this a real div? or just a fantasy</DynamicComponent>
//       <DynamicComponent tag="a" href="http://example.com">
//         Some Link
//       </DynamicComponent>
//       <DynamicComponent tag={AnotherComponent} />
//       <DynamicComponent tag="svg">
//         <circle
//           cx="50"
//           cy="50"
//           r="40"
//           stroke="black"
//           stroke-width="3"
//           fill="red"
//         />
//         <text x="0" y="110">
//           Im an SVG!
//         </text>
//       </DynamicComponent>
//     </div>
//   );
// }