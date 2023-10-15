import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface ChapterAccordionProps {
  chapters: Array<{
    chapter: number;
    title: string;
    content: string;
  }>;
}

const ChapterAccordion = ({ chapters }: ChapterAccordionProps) => (
  <Accordion flex={4} maxW={1000} allowMultiple defaultIndex={[1]}>
    {chapters.map(({ chapter, title, content }) => (
      <AccordionItem
        key={chapter}
        display="flex"
        bg="#21221D"
        flexDirection={{ base: "column", md: "row" }}
        border="none"
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton
              display="flex"
              pl={4}
              pt={2}
              fontWeight="bold"
              justifyContent="space-between"
              alignItems="flex-start"
              flexBasis={{ base: "1.5rem", md: "9rem" }}
            >
              <Box>Chapter {chapter}</Box>
              <Box display={{ base: "block", md: "none" }}>
                {isExpanded ? "▲" : "▼"}
              </Box>
            </AccordionButton>
            <Box flex={1}>
              <AccordionButton
                textAlign="left"
                fontWeight="bold"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>{title}</Box>
                <Box display={{ base: "none", md: "block" }}>
                  {isExpanded ? "▲" : "▼"}
                </Box>
              </AccordionButton>
              <AccordionPanel my={3}>{content}</AccordionPanel>
            </Box>
          </>
        )}
      </AccordionItem>
    ))}
  </Accordion>
);

export default ChapterAccordion;
