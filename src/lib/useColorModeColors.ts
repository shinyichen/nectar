import { useColorMode } from '@chakra-ui/react';

const elements = [
  'background',
  'text',
  'disalbedText',
  'link',
  'highlightBackground',
  'highlightForeground',
  'disabledBackground',
  'disabledForeground',
  'border',
  'panel',
  'panelHighlight',
  'lightText',
  'brand',
  'tableHighlightBackgroud',
  'disabledInput',
  'pill',
  'pillText',
] as const;

export type ColorModeColors = { [key in typeof elements[number]]: string };

export const useColorModeColors = (): ColorModeColors => {
  const { colorMode } = useColorMode();

  return colorMode === 'light'
    ? {
        background: 'white',
        text: 'gray.700',
        disalbedText: 'gray.400',
        link: 'blue.500',
        highlightBackground: 'blue.100',
        highlightForeground: 'gray.800',
        disabledBackground: 'gray.50',
        disabledForeground: 'gray.300',
        border: 'gray.100',
        panel: 'gray.50',
        panelHighlight: 'blue.500',
        lightText: 'gray.600',
        brand: 'blue.600',
        tableHighlightBackgroud: 'blue.50',
        disabledInput: 'gray.50',
        pill: 'blue.100',
        pillText: 'gray.800',
      }
    : {
        background: 'gray.800',
        text: 'gray.50',
        disalbedText: 'gray.100',
        link: 'blue.200',
        highlightBackground: 'gray.600',
        highlightForeground: 'gray.100',
        disabledBackground: 'gray.700',
        disabledForeground: 'gray.400',
        border: 'gray.400',
        panel: 'gray.700',
        panelHighlight: 'blue.200',
        lightText: 'gray.200',
        brand: 'blue.300',
        tableHighlightBackgroud: 'gray.700',
        disabledInput: 'gray.700',
        pill: 'blue.200',
        pillText: 'white',
      };
};

export const useColorModeColorVars = (): ColorModeColors => {
  const { colorMode } = useColorMode();

  return colorMode === 'light'
    ? {
        background: 'var(--chakra-colors-white)',
        text: 'var(--chakra-colors-gray-700)',
        disalbedText: 'var(--chakra-colors-gray-400)',
        link: 'var(--chakra-colors-blue-500)',
        highlightBackground: 'var(--chakra-colors-blue-100)',
        highlightForeground: 'var(--chakra-colors-gray-800)',
        disabledBackground: 'var(--chakra-colors-gray-50)',
        disabledForeground: 'var(--chakra-colors-gray-300)',
        border: 'var(--chakra-colors-gray-100)',
        panel: 'var(--chakra-colors-gray-50)',
        panelHighlight: 'var(--chakra-colors-blue-500)',
        lightText: 'var(--chakra-colors-gray-600)',
        brand: 'var(--chakra-colors-blue-600)',
        tableHighlightBackgroud: 'var(--chakra-colors-blue-50)',
        disabledInput: 'var(--chakra-colors-gray-50)',
        pill: 'var(--chakra-colors-blue-100)',
        pillText: 'var(--chakra-colors-gray-800)',
      }
    : {
        background: 'var(--chakra-colors-gray-800)',
        text: 'var(--chakra-colors-gray-50)',
        disalbedText: 'var(--chakra-colors-gray-100)',
        link: 'var(--chakra-colors-blue-200)',
        highlightBackground: 'var(--chakra-colors-gray-600)',
        highlightForeground: 'var(--chakra-colors-gray-100)',
        disabledBackground: 'var(--chakra-colors-gray-700)',
        disabledForeground: 'var(--chakra-colors-gray-400)',
        border: 'var(--chakra-colors-gray-400)',
        panel: 'var(--chakra-colors-gray-50)',
        panelHighlight: 'var(--chakra-colors-gray-500)',
        lightText: 'var(--chakra-colors-gray-500)',
        brand: 'var(--chakra-colors-blue-600)',
        tableHighlightBackgroud: 'blue.50',
        disabledInput: 'var(--chakra-colors-gray-50)',
        pill: 'var(--chakra-colors-blue-200)',
        pillText: 'var(--chakra-colors-white)',
      };
};
