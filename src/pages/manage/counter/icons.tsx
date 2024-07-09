import { JSX } from "solid-js"

const iconStyle = {
  width: "12px",
  height: "12px",
  marginLeft: "4px",
}

type SvgProps = JSX.IntrinsicElements["svg"]

const SvgChevronSort = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    style={iconStyle}
    {...props}
  >
    <path
      d="M16 28l-7-7l1.41-1.41L16 25.17l5.59-5.58L23 21l-7 7z"
      fill="currentColor"
    ></path>
    <path
      d="M16 4l7 7l-1.41 1.41L16 6.83l-5.59 5.58L9 11l7-7z"
      fill="currentColor"
    ></path>
  </svg>
)

const SvgChevronSortDown = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    style={iconStyle}
    {...props}
  >
    <path
      d="M16 28l-7-7l1.4-1.4l5.6 5.6l5.6-5.6L23 21z"
      fill="currentColor"
    ></path>
  </svg>
)

const SvgChevronSortUp = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    style={iconStyle}
    {...props}
  >
    <path
      d="M16 4l7 7l-1.4 1.4L16 6.8l-5.6 5.6L9 11z"
      fill="currentColor"
    ></path>
  </svg>
)

export { SvgChevronSort, SvgChevronSortUp, SvgChevronSortDown }
