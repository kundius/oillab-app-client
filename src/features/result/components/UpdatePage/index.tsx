import React, { useState } from 'react'
import { Button, InputGroup, TextArea, Intent, MenuItem } from '@blueprintjs/core'
import { ItemPredicate, ItemRenderer, Select } from "@blueprintjs/select"

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster, showToast } from '@components/AppToaster'
import { FormField } from '@components/FormField'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { Table } from '@app/components/Table'
import { Wall } from '@app/components/Wall'

export interface UpdatePageProps {
  initialResult: schema.ResultUpdatePageFragment
}

interface IndicatorColor {
  value: types.ResultIndicatorColor
  label: string
  color: string
}

interface ResearchColor {
  value: types.ResultResearchColor
  label: string
  color: string
}

interface IndicatorTableColumn {
  id: number
  name: string
  ntd: string
  units: string
}

interface ResearchTableColumn {
  id: number
  name: string
}

const INDICATOR_COLORS: IndicatorColor[] = [{
  label: 'Зеленый',
  value: types.ResultIndicatorColor.Green,
  color: '#eaf1dd'
}, {
  label: 'Желтый',
  value: types.ResultIndicatorColor.Yellow,
  color: '#ffff00'
}, {
  label: 'Красный',
  value: types.ResultIndicatorColor.Red,
  color: '#f2dbdb'
}, {
  label: 'Белый',
  value: types.ResultIndicatorColor.White,
  color: 'white'
}]

const RESEARCH_COLORS: ResearchColor[] = [{
  label: 'Зеленый',
  value: types.ResultResearchColor.Green,
  color: '#eaf1dd'
}, {
  label: 'Желтый',
  value: types.ResultResearchColor.Yellow,
  color: '#ffff00'
}, {
  label: 'Красный',
  value: types.ResultResearchColor.Red,
  color: '#f2dbdb'
}, {
  label: 'Белый',
  value: types.ResultResearchColor.White,
  color: 'white'
}]

export function UpdatePage({ initialResult }: UpdatePageProps) {
  const query = schema.useResultUpdatePageQuery({
    variables: {
      id: initialResult.id
    }
  })
  const [mutation, mutationState] = schema.useResultUpdatePageMutation()

  const result = query.data?.result || initialResult
  const [interpretation, setInterpretation] = useState(result.interpretation || '')

  const pageTitle = result.formNumber

  const getIndicatorColumns = () => {
    return result?.oilType?.indicators.reduce<IndicatorTableColumn[]>(
      (accumulator, currentValue) => {
        if (!!currentValue) {
          accumulator.push({
            id: currentValue.id,
            name: currentValue.name,
            ntd: currentValue.ntd,
            units: currentValue.units
          })
        }
        return accumulator
      },
      []
    )
  }

  const getResearchColumns = () => {
    return result?.oilType?.researches.reduce<ResearchTableColumn[]>(
      (accumulator, currentValue) => {
        if (!!currentValue) {
          accumulator.push({
            id: currentValue.id,
            name: currentValue.name
          })
        }
        return accumulator
      },
      []
    )
  }

  const getIndicatorDefaultValues = () => {
    return getIndicatorColumns().map((indicator) => {
      const resultIndicator = result.indicators.find((item) => item.oilTypeIndicator.id === indicator.id)
      return {
        oilTypeIndicatorId: indicator.id,
        value: resultIndicator?.value || '',
        color: resultIndicator?.color || types.ResultIndicatorColor.White
      }
    })
  }

  const getResearchDefaultValues = () => {
    return getResearchColumns().map((research) => {
      const resultResearch = result.researches.find((item) => item.oilTypeResearch.id === research.id)
      return {
        oilTypeResearchId: research.id,
        value: resultResearch?.value || '',
        color: resultResearch?.color || types.ResultResearchColor.White
      }
    })
  }

  const [indicatorValues, setIndicatorValues] = useState<types.ResultUpdateIndicatorValue[]>(
    getIndicatorDefaultValues()
  )

  const [researchValues, setResearchValues] = useState<types.ResultUpdateResearchValue[]>(
    getResearchDefaultValues()
  )

  const getIndicatorValue = (indiatorId: number) => {
    return indicatorValues.find((item) => item.oilTypeIndicatorId === indiatorId)
  }
  
  const getResearchValue = (researchId: number) => {
    return researchValues.find((item) => item.oilTypeResearchId === researchId)
  }
  
  const changeIndicatorValue = (indiatorId: number, data: Partial<types.ResultUpdateIndicatorValue>) => {
    setIndicatorValues((prev) => prev.map((item) => {
      if (item.oilTypeIndicatorId === indiatorId) {
        return {
          ...item,
          ...data
        }
      }
      return item
    }))
  }
  
  const changeResearchValue = (researchId: number, data: Partial<types.ResultUpdateResearchValue>) => {
    setResearchValues((prev) => prev.map((item) => {
      if (item.oilTypeResearchId === researchId) {
        return {
          ...item,
          ...data
        }
      }
      return item
    }))
  }

  const submitHandler = async () => {
    try {
      const response = await mutation({
        variables: {
          id: initialResult.id,
          input: {
            interpretation: interpretation,
            values: indicatorValues,
            researches: researchValues
          }
        }
      })
  
      if (response.data?.resultUpdate.success) {
        await showToast({
          message: 'Результаты изменены',
          intent: Intent.SUCCESS
        })
      }
  
      if (response.data?.resultUpdate.error) {
        await showToast({
          message: response.data.resultUpdate.error.message,
          intent: Intent.DANGER
        })
      }
    } catch (e) {
      await showToast({
        message: e?.message || 'Возникла непредвиденная ошибка',
        intent: Intent.DANGER
      })
    }
  }

  return (
    <MainTemplate
      title={`${pageTitle} / Результаты`}
      headline={[
        {
          href: '/result',
          title: 'Результаты'
        },
        {
          title: pageTitle
        }
      ]}
      extra={
        <Button
          intent={Intent.PRIMARY}
          type="button"
          onClick={submitHandler}
          loading={mutationState.loading}
          disabled={mutationState.loading}
        >
          Сохранить
        </Button>
      }
    >
      <div className="space-y-16">
    
        <div class="title-normal">
          Техника / точка отбора образца
        </div>
        
        <div class="data-layout">
          <div class="data-layout-group data-layout-group_vehicle-left">
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Производитель оборудования</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${vehicle?.model || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Модель оборудования</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${vehicle?.engineModel || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Общая наработка узла</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${report?.totalMileage || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Общая наработка на СМ</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${report?.lubricantMileage || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Долив СМ</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${report?.vehicleToppingUpLubricant || '-'}</div>
              </div>
            </div>
          </div>
          <div class="data-layout-group data-layout-group_right">
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Регистрационный номер</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${vehicle?.stateNumber || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Точка отбора образца</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${report?.samplingNodes || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Объём жидкости в оборудовании</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${vehicle?.liquidVolume || '-'}</div>
              </div>
            </div>
          </div>
        </div>
    
        <hr />
    
        <div class="title-normal">
          Информация о смазочном материале
        </div>
        
        <div class="data-layout">
          <div class="data-layout-group">
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Бренд СМ</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${lubricant?.brand || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Марка СМ</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${lubricant?.model || '-'}</div>
              </div>
            </div>
          </div>
          <div class="data-layout-group">
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Вязкость</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${lubricant?.viscosity || '-'}</div>
              </div>
            </div>
            <div class="data-layout-row">
              <div class="data-layout-label">
                <div class="data-label">Состояние СМ</div>
              </div>
              <div class="data-layout-value">
                <div class="data-value">${report?.lubricantState || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      
        <FormField label="Интерпретация полученных данных">
          <TextArea
            className="w-full"
            growVertically
            disabled={mutationState.loading}
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
          />
        </FormField>
          
        <Wall>
          <Table<IndicatorTableColumn>
            data={getIndicatorColumns()}
            rowKey={(record) => record.id}
          >
            <Table.Column
              width={60}
              title="№"
              render={(_, __, n) => {
                return n + 1
              }}
            />
            <Table.Column title="Наименование показателя" dataIndex="name" render={(value) => <div dangerouslySetInnerHTML={{ __html: value }} />} />
            <Table.Column title="НТД" dataIndex="ntd" render={(value) => <div dangerouslySetInnerHTML={{ __html: value }} />} />
            <Table.Column title="Единицы измерения" dataIndex="units" render={(value) => <div dangerouslySetInnerHTML={{ __html: value }} />} />
            <Table.Column<IndicatorTableColumn>
              title="Результат"
              dataIndex="id"
              render={(id: number, record) => {
                const indicatorValue = getIndicatorValue(id)
                if (indicatorValue) {
                  return (
                    <InputGroup
                      className="w-full my-[-3px]"
                      disabled={mutationState.loading}
                      value={indicatorValue.value}
                      onChange={(e) => changeIndicatorValue(id, {
                        value: e.target.value
                      })}
                    />
                  )
                }
              }}
            />
            <Table.Column<IndicatorTableColumn>
              title="Цвет"
              dataIndex="id"
              width={110}
              render={(id: number, record) => {
                const indicatorValue = getIndicatorValue(id)
                if (indicatorValue) {
                  return (
                    <Select<IndicatorColor>
                      filterable={false}
                      items={INDICATOR_COLORS}
                      itemRenderer={(color, { handleClick, handleFocus, modifiers }) => {
                        if (!modifiers.matchesPredicate) {
                          return null;
                        }
                        return (
                          <MenuItem
                            text={<div style={{ width: 50, height: 20, background: color.color }} />}
                            label={color.label}
                            active={modifiers.active}
                            key={color.value}
                            onClick={handleClick}
                            onFocus={handleFocus}
                          />
                        )
                      }}
                      onItemSelect={(color) => changeIndicatorValue(id, {
                        color: color.value
                      })}
                    >
                      <Button
                        text={<div style={{ width: 50, height: 20, background: INDICATOR_COLORS.find((item) => item.value === indicatorValue.color)?.color }} />}
                        rightIcon="double-caret-vertical"
                        placeholder="Выбрать цвет"
                      />
                    </Select>
                  )
                }
              }}
            />
          </Table>
        </Wall>
        {result.oilType.standard && (
          <Wall>
            <Table<ResearchTableColumn>
              data={getResearchColumns()}
              rowKey={(record) => record.id}
            >
              <Table.Column
                width={60}
                title="№"
                render={(_, __, n) => {
                  return n + 1
                }}
              />
              <Table.Column title="Наименование показателя" dataIndex="name" render={(value) => <div dangerouslySetInnerHTML={{ __html: value }} />} />
              <Table.Column<ResearchTableColumn>
                title="Результат"
                dataIndex="id"
                render={(id: number, record) => {
                  const researchValue = getResearchValue(id)
                  if (researchValue) {
                    return (
                      <InputGroup
                        className="w-full my-[-3px]"
                        disabled={mutationState.loading}
                        value={researchValue.value}
                        onChange={(e) => changeResearchValue(id, {
                          value: e.target.value
                        })}
                      />
                    )
                  }
                }}
              />
              <Table.Column<ResearchTableColumn>
                title="Цвет"
                dataIndex="id"
                width={110}
                render={(id: number, record) => {
                  const researchValue = getResearchValue(id)
                  if (researchValue) {
                    return (
                      <Select<ResearchColor>
                        filterable={false}
                        items={RESEARCH_COLORS}
                        itemRenderer={(color, { handleClick, handleFocus, modifiers }) => {
                          if (!modifiers.matchesPredicate) {
                            return null;
                          }
                          return (
                            <MenuItem
                              text={<div style={{ width: 50, height: 20, background: color.color }} />}
                              label={color.label}
                              active={modifiers.active}
                              key={color.value}
                              onClick={handleClick}
                              onFocus={handleFocus}
                            />
                          )
                        }}
                        onItemSelect={(color) => changeResearchValue(id, {
                          color: color.value
                        })}
                      >
                        <Button
                          text={<div style={{ width: 50, height: 20, background: RESEARCH_COLORS.find((item) => item.value === researchValue.color)?.color }} />}
                          rightIcon="double-caret-vertical"
                          placeholder="Выбрать цвет"
                        />
                      </Select>
                    )
                  }
                }}
              />
            </Table>
          </Wall>
        )}
      </div>
    </MainTemplate>
  )
}
