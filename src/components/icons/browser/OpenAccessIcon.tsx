import { forwardRef, Ref, SVGProps } from 'react';
const icon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="64px"
    height="64px"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="#2ca61c"
    stroke="#2ca61c"
    role="img"
    ref={ref}
    {...props}
  >
    <g fill="none" stroke="#1d914f" strokeMiterlimit={10} strokeWidth={4.416}>
      <path d="M23 1h32v62H9V15z" />
      <path d="M9 15h14V1M34.887 42H39c1.887 0 3-1 3-3 0-1-1-3-3-3 0-3.604-3.277-6-7-6-3.295 0-6.413 2.978-7 6-2 0-3 2-3 3 0 2 1 3 3 3h10.434" />
    </g>
  </svg>
);
export const OpenAccessIcon = forwardRef(icon);
