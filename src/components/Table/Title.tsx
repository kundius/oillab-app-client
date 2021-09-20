import React, { useState } from 'react'
import {
  ButtonGroup,
  Button,
  AnchorButton,
  Divider,
  Intent,
  NonIdealState,
  Spinner,
  Popover,
  Icon,
  Classes,
  FormGroup,
  InputGroup,
  Tooltip
} from '@blueprintjs/core'

interface TitleBase<SortType, FilterType> {
  text: string
  sortAsc?: SortType
  sortDesc?: SortType
  sortValue?: SortType
  onSortChange?: (value: SortType) => void
  filterValue?: FilterType
  onFilterChange?: (value?: FilterType) => void
}

interface TitleWithFilterNumber<SortType>
  extends TitleBase<SortType, NumberValue> {
  filter: 'number'
}

interface TitleWithFilterString<SortType>
  extends TitleBase<SortType, StringValue> {
  filter: 'string'
}

export type TitleProps<SortType> =
  | TitleWithFilterNumber<SortType>
  | TitleWithFilterString<SortType>

export interface NumberValue {
  lt?: number | null
  gt?: number | null
  eq?: number | null
}

export interface StringValue {
  eq?: string | null
  contains?: string | null
}

interface FilterProps<ValueType> {
  isOpened: boolean
  setIsOpened: (v: boolean) => void
  value?: ValueType
  onChange?: (value?: ValueType) => void
}

const FilterString = ({
  isOpened,
  setIsOpened,
  onChange,
  value
}: FilterProps<StringValue>) => {
  const [exact, setExact] = useState(!!value?.eq)
  const [text, setText] = useState((value?.eq || value?.contains) || undefined)

  const handleToggleExact = () => {
    setExact((prev) => !prev)
  }
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleReset = () => {
    setExact(false)
    setText(undefined)
    onChange?.(undefined)
    setIsOpened(false)
  }
  const handleSubmit = () => {
    onChange?.(exact ? { eq: text } : { contains: text })
    setIsOpened(false)
  }

  return (
    <div>
      <FormGroup>
        <InputGroup
          placeholder="Введите текст"
          value={text}
          onChange={handleChangeText}
          rightElement={
            <Tooltip content="Точное соответствие">
              <Button
                icon="high-priority"
                minimal
                active={exact}
                onClick={handleToggleExact}
              />
            </Tooltip>
          }
        />
      </FormGroup>
      <div className="flex justify-between">
        <Button text="Очистить" onClick={handleReset} />
        <Button intent="primary" text="Поиск" onClick={handleSubmit} />
      </div>
    </div>
  )
}

const FilterNumber = (props: FilterProps<NumberValue>) => {
  return (
    <div>
      <FormGroup>
        <InputGroup id="text-input" placeholder="Введите число" />
      </FormGroup>
      <div className="flex justify-between">
        <Button text="Очистить" />
        <Button intent="primary" text="Поиск" />
      </div>
    </div>
  )
}

export function Title<SortType>({
  text,
  sortAsc,
  sortDesc,
  sortValue,
  onSortChange,
  ...props
}: TitleProps<SortType>) {
  const [isFilterOpened, setIsFilterOpened] = useState(false)
  function getFilterContent() {
    if (props.filter === 'string') {
      return (
        <FilterString
          isOpened={isFilterOpened}
          setIsOpened={setIsFilterOpened}
          value={props.filterValue}
          onChange={props.onFilterChange}
        />
      )
    }
    if (props.filter === 'number') {
      return (
        <FilterNumber
          isOpened={isFilterOpened}
          setIsOpened={setIsFilterOpened}
          value={props.filterValue}
          onChange={props.onFilterChange}
        />
      )
    }
    throw 'unimplemented'
  }
  return (
    <div className="flex items-center">
      {text}
      <ButtonGroup minimal className="ml-2 -mt-2 -mb-2">
        {props.filter && (
          <Popover
            isOpen={isFilterOpened}
            placement="bottom"
            interactionKind="click"
            popoverClassName={Classes.POPOVER_CONTENT_SIZING}
            onInteraction={setIsFilterOpened}
            content={getFilterContent()}
          >
            <Button icon="filter" small active={!!props.filterValue} />
          </Popover>
        )}
        {(sortDesc || sortAsc) && props.filter && <Divider />}
        {sortDesc && (
          <Button
            icon="arrow-down"
            small
            active={sortDesc === sortValue}
            onClick={() => onSortChange?.(sortDesc)}
          />
        )}
        {sortAsc && (
          <Button
            icon="arrow-up"
            small
            active={sortAsc === sortValue}
            onClick={() => onSortChange?.(sortAsc)}
          />
        )}
      </ButtonGroup>
    </div>
  )
}
