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
  Tooltip,
  NumericInput
} from '@blueprintjs/core'
import classNames from 'classnames'
import {
  DateInput,
  DateFormatProps,
  TimePrecision,
  DateRangeInput,
  DateRange
} from '@blueprintjs/datetime'

import * as styles from './Title.module.css'

interface TitleBase<SortType, FilterType> {
  text: string
  sortAsc?: SortType
  sortDesc?: SortType
  sortValue?: SortType
  onSortChange?: (value?: SortType) => void
  filterValue?: FilterType
  onFilterChange?: (value?: FilterType) => void
}

interface TitleWithFilterNumber<SortType>
  extends TitleBase<SortType, NumberValue> {
  filter?: 'number'
}

interface TitleWithFilterString<SortType>
  extends TitleBase<SortType, StringValue> {
  filter?: 'string'
}

interface TitleWithFilterDate<SortType> extends TitleBase<SortType, DateValue> {
  filter?: 'date'
}

export type TitleProps<SortType> =
  | TitleWithFilterNumber<SortType>
  | TitleWithFilterString<SortType>
  | TitleWithFilterDate<SortType>

export interface NumberValue {
  lt?: number | null
  gt?: number | null
  eq?: number | null
}

export interface DateValue {
  lt?: Date | null
  gt?: Date | null
  eq?: Date | null
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

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str)
}

const FilterString = ({
  isOpened,
  setIsOpened,
  onChange,
  value
}: FilterProps<StringValue>) => {
  const [exact, setExact] = useState(!!value?.eq)
  const [text, setText] = useState(value?.eq || value?.contains || undefined)

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

const FilterDate = ({
  isOpened,
  setIsOpened,
  onChange,
  value
}: FilterProps<DateValue>) => {
  const [eq, setEq] = useState(value?.eq || undefined)
  const [gt, setGt] = useState(value?.gt || undefined)
  const [lt, setLt] = useState(value?.lt || undefined)

  const handleReset = () => {
    setEq(undefined)
    setGt(undefined)
    setLt(undefined)
    onChange?.(undefined)
    setIsOpened(false)
  }

  const handleSubmit = () => {
    onChange?.({
      eq,
      gt,
      lt
    })
    setIsOpened(false)
  }

  const handleRangeChange = (selectedRange: DateRange) => {
    setGt(selectedRange[0] || undefined)
    setLt(selectedRange[1] || undefined)
  }

  return (
    <div>
      <div className="flex flex-col">
        <DateRangeInput
          {...jsDateFormatter}
          onChange={handleRangeChange}
          value={[gt || null, lt || null]}
          highlightCurrentDay
          className={`${styles.rangeInput} mb-4`}
          shortcuts={false}
          endInputProps={{
            placeholder: 'Конечная дата'
          }}
          startInputProps={{
            placeholder: 'Начальная дата'
          }}
        />
        <DateInput
          {...jsDateFormatter}
          className="w-64 mb-4"
          value={value?.eq}
          onChange={setEq}
          placeholder="Точная дата"
        />
      </div>
      <div className="flex justify-between">
        <Button text="Очистить" onClick={handleReset} />
        <Button intent="primary" text="Поиск" onClick={handleSubmit} />
      </div>
    </div>
  )
}

const FilterNumber = ({
  isOpened,
  setIsOpened,
  onChange,
  value
}: FilterProps<NumberValue>) => {
  const [eq, setEq] = useState(value?.eq || undefined)
  const [gt, setGt] = useState(value?.gt || undefined)
  const [lt, setLt] = useState(value?.lt || undefined)

  const handleReset = () => {
    setEq(undefined)
    setGt(undefined)
    setLt(undefined)
    onChange?.(undefined)
    setIsOpened(false)
  }

  const handleSubmit = () => {
    onChange?.({
      eq,
      gt,
      lt
    })
    setIsOpened(false)
  }

  return (
    <div>
      <div className="flex flex-col mb-4">
        <div className="flex gap-4 mb-4">
          <NumericInput
            onValueChange={setGt}
            value={gt}
            fill
            placeholder="От"
          />
          <NumericInput
            onValueChange={setLt}
            value={lt}
            fill
            placeholder="До"
          />
        </div>
        <NumericInput
          onValueChange={setEq}
          value={eq}
          fill
          placeholder="Равно"
        />
      </div>
      <div className="flex justify-between">
        <Button text="Очистить" onClick={handleReset} />
        <Button intent="primary" text="Поиск" onClick={handleSubmit} />
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
    if (props.filter === 'date') {
      return (
        <FilterDate
          isOpened={isFilterOpened}
          setIsOpened={setIsFilterOpened}
          value={props.filterValue}
          onChange={props.onFilterChange}
        />
      )
    }
    throw 'unimplemented'
  }

  const handleSortToggle = () => {
    if (sortAsc === sortValue) {
      onSortChange?.(sortDesc)
    } else if (sortDesc === sortValue) {
      onSortChange?.(undefined)
    } else {
      onSortChange?.(sortAsc)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div
        className={classNames('mr-auto', {
          [styles.labelWithSort]: sortDesc || sortAsc
        })}
        onClick={handleSortToggle}
      >
        <div className="relative z-30">{text}</div>
      </div>
      {(sortDesc || sortAsc) && (
        <div className="flex flex-col relative z-30 pointer-events-none">
          <div
            className={classNames(styles.sortAsc, {
              [styles.sortAscActive]: sortAsc === sortValue
            })}
          />
          <div
            className={classNames(styles.sortDesc, {
              [styles.sortDescActive]: sortDesc === sortValue
            })}
          />
        </div>
      )}
      {props.filter && (
        <Popover
          isOpen={isFilterOpened}
          placement="bottom"
          interactionKind="click"
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          onInteraction={setIsFilterOpened}
          content={getFilterContent()}
        >
          <Button
            icon="filter"
            small
            active={!!props.filterValue}
            className={`${styles.filterButton} relative z-30`}
            minimal
          />
        </Popover>
      )}
    </div>
  )
}
