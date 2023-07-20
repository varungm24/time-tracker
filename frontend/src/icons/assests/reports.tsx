import * as React from "react";
import { SVGProps } from "react";
const Reports = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 24}
    height={props?.height || 24}
    fill={props?.fill || "#000"}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill={props?.fill || "#000"}
      fillRule="evenodd"
      d="M406.294 383.114A199.994 199.994 0 0 0 435.959 312h-91.345a112.006 112.006 0 0 1-61.753 63.475 111.998 111.998 0 0 1-122.057-24.279 112.005 112.005 0 0 1-24.278-122.057A112.004 112.004 0 0 1 200 167.386V76.041a200 200 0 1 0 206.294 307.073ZM200 35.357A240.002 240.002 0 0 0 4.612 318.822a240.004 240.004 0 0 0 188.566 188.566A239.996 239.996 0 0 0 476.643 312a239.865 239.865 0 0 0 3.224-32.001c.147-4.416-3.449-7.999-7.867-7.999H320c-4.418 0-7.954 3.593-8.444 7.984a72 72 0 1 1-79.54-79.54c4.391-.49 7.984-4.026 7.984-8.444V40c0-4.418-3.583-8.014-7.998-7.867A239.961 239.961 0 0 0 200 35.357Z"
      clipRule="evenodd"
    />
    <path
      fill={props?.fill || "#000"}
      fillRule="evenodd"
      d="M348.537 55.224A200.011 200.011 0 0 0 312 44.041v91.345A111.994 111.994 0 0 1 376.614 200h91.345a200.01 200.01 0 0 0-54.538-101.421 199.992 199.992 0 0 0-64.884-43.355ZM508.643 200A240 240 0 0 0 279.999.133C275.583-.014 272 3.582 272 8v152c0 4.418 3.593 7.954 7.984 8.444a72.004 72.004 0 0 1 58.535 44.003 71.977 71.977 0 0 1 5.037 19.569c.49 4.391 4.026 7.984 8.444 7.984h152c4.418 0 8.014-3.583 7.867-7.998A239.95 239.95 0 0 0 508.643 200Z"
      clipRule="evenodd"
    />
    <path
      fill={props?.fill || "#000"}
      d="M312 44.04A200.011 200.011 0 0 1 413.421 98.58 199.993 199.993 0 0 1 467.959 200h-91.345A112.013 112.013 0 0 0 312 135.386V44.041ZM435.959 312a199.994 199.994 0 0 1-119.422 144.776 200.006 200.006 0 0 1-217.958-43.355 199.997 199.997 0 0 1-43.355-217.958A199.999 199.999 0 0 1 200 76.041v91.345a112.004 112.004 0 0 0-39.196 183.81 112.009 112.009 0 0 0 122.057 24.279A112.006 112.006 0 0 0 344.614 312h91.345Z"
    />
  </svg>
);
export default Reports;
