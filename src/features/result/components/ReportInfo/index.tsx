import { Wall } from '@app/components/Wall'
import * as schema from './schema.generated'
import styles from './styles.module.css'

export interface ReportInfoProps {
  formNumber: string
}

export function ReportInfo({ formNumber }: ReportInfoProps) {
  const query = schema.useResult_ReportInfo_Query({
    variables: {
      formNumber
    }
  })
  const report = query.data?.reportByFormNumber
  const vehicle = query.data?.reportByFormNumber?.vehicle
  const lubricant = query.data?.reportByFormNumber?.lubricantEntity

  return (
    <Wall>
      <div className={styles['title-normal']} style={{ marginTop: 0 }}>
        Техника / точка отбора образца
      </div>

      <div className={styles['fields']}>
        <table>
          <tr>
            <td colSpan={2}>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Производитель оборудования
                </div>
                <div className={styles['field__input']}>
                  {vehicle?.model || ''}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Регистрационный номер
                </div>
                <div className={styles['field__input']}>
                  {vehicle?.stateNumber || ''}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Модель оборудования
                </div>
                <div className={styles['field__input']}>
                  {vehicle?.engineModel || ''}
                </div>
              </div>
            </td>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Год выпуска</div>
                <div className={styles['field__input']}>
                  {vehicle?.releaseYear || ''}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div className={styles['fields']}>
        <table>
          <tr>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Общая наработка узла
                </div>
                <div className={styles['field__input']}>
                  {report?.totalMileage || ''}
                </div>
              </div>
            </td>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Объём жидкости в оборудовании
                </div>
                <div className={styles['field__input']}>
                  {vehicle?.liquidVolume || ''}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>
                  Общая наработка на СМ
                </div>
                <div className={styles['field__input']}>
                  {report?.lubricantMileage || ''}
                </div>
              </div>
            </td>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Долив СМ</div>
                <div className={styles['field__input']}>
                  {report?.vehicleToppingUpLubricant || ''}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div className={styles['title-normal']} style={{ marginTop: 32 }}>
        Информация о смазочном материале
      </div>

      <div className={styles['fields']}>
        <table>
          <tr>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Бренд СМ</div>
                <div className={styles['field__input']}>
                  {lubricant?.brandEntity?.name || ''}
                </div>
              </div>
            </td>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Вязкость</div>
                <div className={styles['field__input']}>
                  {lubricant?.viscosity || ''}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Марка СМ</div>
                <div className={styles['field__input']}>
                  {lubricant?.model || ''}
                </div>
              </div>
            </td>
            <td>
              <div className={styles['field']}>
                <div className={styles['field__label']}>Состояние СМ</div>
                <div className={styles['field__input']}>
                  {report?.lubricantState || ''}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div className={styles['title-normal']} style={{ marginTop: 32 }}>
        Примечание:
      </div>

      <div className={styles['field']}>
        <div className={styles['field__input']} style={{ minHeight: '3rem' }}>
          {report?.note || ''}
        </div>
      </div>
    </Wall>
  )
}
