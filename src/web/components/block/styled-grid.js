import styled, { css } from 'styled-components';

export const Container = styled.div `
  padding-right: 10px;
  padding-left: 10px;
  margin-left: auto;
  margin-right: auto;
`
export const Row = styled.div `
  position: relative;
  margin-right: -10px;
  margin-left: -10px;

  &::after {
    clear: both;
    content: "";
    display: table;
  }
`
// 默认点栅格化列数
const columns = 12

// 默认的响应式区间
const breakpoints = {
  // sm
  phone: {
    max: 768
  },
  // md
  tablet: {
    min: 768,
    max: 1160
  },
  // hd
  desktop: {
    min: 1160,
    max: 1400
  },
  // lg
  large: {
    min: 1400
  }
}

const media = Object.keys(breakpoints).reduce((acc, key) => {
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const min = breakpoints[key].min / 16
  const max = breakpoints[key].max / 16
  acc[key] = (...args) => {
    if (min && max) {
      return css`
        @media (max-width: ${max}em) and (min-width: ${min}em) {
          ${css(...args)};
        }
      `
    } else if (!min && max) {
      return css`
        @media (max-width: ${max}em) {
          ${css(...args)};
        }
      `
    } else if (min && !max) {
      return css`
        @media (min-width: ${min}em) {
          ${css(...args)};
        }
      `
    }
  }
  return acc
}, {})

const getCSS = (props, key) => {
  let css = `width: ${props => ((props[key] ? props[key] : props.col) / columns) * 100}%;`
  if(props.pull) {
    return css += `left: ${props => (props.pull / columns) * 100}%;`
  } else {
    return css
  }
}

export const Col = styled.div `
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
  float: left;
  width: ${props => (props.col / columns) * 100}%;
  ${media.phone`width: ${props => ((props.sm ? props.sm : props.col) / columns) * 100}%;`}
  ${media.desktop`
      width: ${props => ((props.md ? props.md : props.col) / columns) * 100}%;
    `}
  ${media.tablet`width: ${props => ((props.hd ? props.hd : props.col) / columns) * 100}%;`}
  ${media.large`width: ${props => ((props.lg ? props.lg : props.col) / columns) * 100}%;`}
`
