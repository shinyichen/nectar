import { SolrSort } from '@api';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Box, Flex, HStack, Stack } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import { BibstemPickerMultiple, Sort } from '@components';
import { ClassicformController, RawClassicFormParams } from '@controllers/classicformController';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, ChangeEventHandler, useCallback, useReducer, useState, useEffect } from 'react';
import { Textarea } from '@chakra-ui/textarea';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import Head from 'next/head';

interface FormEvent {
  name: string;
  value: string;
}
const formReducer = (state: Record<string, string>, event: FormEvent) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const ClassicForm: NextPage = () => {
  const Router = useRouter();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isMounted, setIsMounted] = useState(false);
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ name, value });
  };

  const handleSortChange = useCallback(
    (sort: SolrSort[]) => {
      setFormData({ name: 'sort', value: sort.join(',') });
    },
    [setFormData],
  );

  const handleFormReset = () => {
    setKey(Math.random()); // used to reset some form elements (force rerender)
  };

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const controller = new ClassicformController(formData as RawClassicFormParams);
    void Router.push(`/search?${controller.getQuery()}`);
  };

  return (
    <Box as="section" aria-labelledby="form-title" my={16}>
      <Head>
        <title>NASA Science Explorer - Classic Form Search</title>
      </Head>
      <form method="post" action="/api/classicform">
        <Stack direction="column" spacing={5} key={key}>
          <VisuallyHidden as="h2" id="form-title">
            Classic Form
          </VisuallyHidden>
          <FormControl>
            <FormLabel>Limit Query</FormLabel>
            <CheckboxGroup>
              {isMounted ? (
                <HStack>
                  <Checkbox id="limit_astronomy" name="limit_astronomy" onChange={handleChange} defaultChecked>
                    Astronomy
                  </Checkbox>
                  <Checkbox id="limit_physics" name="limit_physics" onChange={handleChange}>
                    Physics
                  </Checkbox>
                  <Checkbox id="limit_general" name="limit_general" onChange={handleChange}>
                    General
                  </Checkbox>
                </HStack>
              ) : (
                <HStack>
                  <input type="checkbox" id="limit_astronomy" name="limit_astronomy" defaultChecked />
                  <label htmlFor="limit_astronomy">Astronomy</label>
                  <input type="checkbox" id="limit_physics" name="limit_physics" />
                  <label htmlFor="limit_physics">Physics</label>
                  <input type="checkbox" id="limit_general" name="limit_general" />
                  <label htmlFor="limit_general">General</label>
                </HStack>
              )}
            </CheckboxGroup>
          </FormControl>
          <Stack direction={{ base: 'column', sm: 'row' }} justifyContent="space-evenly" spacing={5}>
            <LogicAndTextarea
              label="Author"
              desc="Author names, enter (Last, First M) one per line"
              onChange={handleChange}
              isMounted={isMounted}
            />
            <LogicAndTextarea
              label="Object"
              desc="SIMBAD object search (one per line)"
              onChange={handleChange}
              isMounted={isMounted}
            />
          </Stack>
          <HStack justifyContent="space-evenly" spacing={5}>
            <FormControl>
              <FormLabel>Publication date start (YYYY/MM)</FormLabel>
              <Input name="pubdate_start" placeholder="YYYY/MM" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Publication date end (YYYY/MM)</FormLabel>
              <Input name="pubdate_end" placeholder="YYYY/MM" onChange={handleChange} />
            </FormControl>
          </HStack>
          <LogicAndInput label="Title" onChange={handleChange} isMounted={isMounted} />

          <LogicAndInput label="Abstract / Keywords" onChange={handleChange} isMounted={isMounted} />

          <FormControl>
            <VisuallyHidden>Property</VisuallyHidden>
            <CheckboxGroup>
              {isMounted ? (
                <HStack>
                  <Checkbox id="refereed_only" name="property_refereed_only" onChange={handleChange} fontWeight="bold">
                    Refereed only
                  </Checkbox>
                  <Checkbox id="physics" name="property_physics" onChange={handleChange} fontWeight="bold">
                    Physics
                  </Checkbox>
                </HStack>
              ) : (
                <HStack>
                  <input type="checkbox" id="refereed_only" name="property_refereed_only" />
                  <label htmlFor="refereed_only">Refereed only</label>
                  <input type="checkbox" id="physics" name="property_physics" />
                  <label htmlFor="physics">Physics</label>
                </HStack>
              )}
            </CheckboxGroup>
          </FormControl>
          {isMounted ? (
            <BibstemPickerMultiple />
          ) : (
            <FormControl>
              <FormLabel>Bibstems</FormLabel>
              <Input name="bibstems" onChange={handleChange} />
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Sort</FormLabel>
            <Sort name="sort" onChange={handleSortChange} />
          </FormControl>
          <Stack direction="row">
            <Button type="submit">Search</Button>
            <Button type="reset" variant="outline" onClick={handleFormReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

const LogicAndTextarea = ({
  label,
  desc,
  onChange,
  isMounted = true,
}: {
  label: string;
  desc: string;
  onChange: ChangeEventHandler;
  isMounted: boolean;
}) => {
  const id = normalizeString(label);
  return (
    <Box width="full">
      <FormControl>
        <Flex direction="row" justifyContent="space-between">
          <FormLabel>{label}</FormLabel>
          <LogicRadios name={id} variant="andor" onChange={onChange} isMounted={isMounted} />
        </Flex>
        <Textarea as="textarea" id={id} name={id} rows={3} defaultValue={''} onChange={onChange} />
        <FormHelperText>{desc}</FormHelperText>
      </FormControl>
    </Box>
  );
};

const LogicAndInput = ({
  label,
  noLogic,
  onChange,
  isMounted = true,
}: {
  label: string;
  noLogic?: boolean;
  onChange: ChangeEventHandler;
  isMounted: boolean;
}) => {
  const id = normalizeString(label);
  return (
    <Box>
      <FormControl>
        <Flex direction="row" justifyContent="space-between">
          <FormLabel>{label}</FormLabel>
          {!noLogic && (
            <LogicRadios name={normalizeString(label)} variant="all" onChange={onChange} isMounted={isMounted} />
          )}
        </Flex>
        <Input id={id} name={id} onChange={onChange} defaultValue={''} />
      </FormControl>
    </Box>
  );
};

const LogicRadios = ({
  name,
  variant = 'andor',
  onChange,
  isMounted = true,
}: {
  name: string;
  variant: 'andor' | 'all';
  onChange: ChangeEventHandler;
  isMounted?: boolean;
}) => {
  const values = {
    andor: ['and', 'or'],
    all: ['and', 'or', 'boolean'],
  };
  const normalizedName = normalizeString(name);

  return (
    <>
      {isMounted ? (
        <RadioGroup defaultValue="and">
          <Stack direction="row">
            {values[variant].map((id) => {
              const fullId = `logic_${normalizedName}_${id}`;
              return (
                <Radio id={fullId} key={id} value={id} name={`logic_${name}`} onChange={onChange}>
                  {id}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      ) : (
        <Stack direction="row">
          {values[variant].map((id) => {
            const fullId = `logic_${normalizedName}_${id}`;
            return (
              <>
                <input type="radio" id={fullId} key={id} value={id} name={`logic_${name}`} checked={id === 'and'} />
                <label htmlFor={fullId}>{id}</label>
              </>
            );
          })}
        </Stack>
      )}
    </>
  );
};

/**
 * Takes in raw string and replaces non-word characters with underscores
 * and lowercases entire string
 * @param {string} raw string to be normalized
 * @returns {string} normalized string
 */
const normalizeString = (raw: string) => raw.replace(/\W+/g, '_').toLowerCase().trim();

export default ClassicForm;
