import palette from '~/styles/app-theme/app.pallete'
import { VisibilityEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: { sm: '40px 36px', md: '40px 72px' }
  },

  input: {
    style: {
      padding: 0
    }
  },

  titleLabel: (value: string) => ({
    shrink: false,
    style: {
      top: -23,
      fontSize: '35px',
      fontWeight: 500,
      maxHeight: '35px',
      marginTop: 0,
      visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
      color: palette.primary[300]
    }
  }),

  titleInput: {
    style: {
      fontSize: '35px',
      fontWeight: 500,
      maxHeight: '35px',
      marginTop: 0
    },
    disableUnderline: true
  },

  descriptionLabel: (value: string) => ({
    shrink: false,
    style: {
      top: -20,
      fontSize: '16px',
      maxHeight: '24px',
      marginTop: 0,
      visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
      color: palette.primary[300]
    }
  }),

  descriptionInput: {
    style: {
      fontSize: '16px',
      maxHeight: '24px',
      marginTop: 0
    },
    disableUnderline: true
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '32px',
    mt: '32px'
  }
}
