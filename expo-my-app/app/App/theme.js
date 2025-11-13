import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isMobile = width < 600;
const isTablet = width >= 600 && width < 900;

export const colors = {
  primary: '#8b4513',
  primaryDark: '#a0522d',
  accent: 'crimson',
  background: 'burlywood',
  text: '#000',
  textLight: '#333',
  border: '#a0764b',
  white: '#fff',
  link: '#000000ff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 40,
};

export const globalStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
    width: isMobile ? '95%' : '90%',
    maxWidth: isMobile ? '100%' : 400,
    marginVertical: isMobile ? spacing.md : spacing.xl,
    marginHorizontal: 'auto',
    paddingVertical: isMobile ? spacing.lg : spacing.xl,
    paddingHorizontal: isMobile ? spacing.md : spacing.xl,
    borderRadius: 8,
    alignSelf: 'center',
    minHeight: isMobile ? 'auto' : '82%',
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  header: {
    alignItems: 'center',
    paddingVertical: isMobile ? spacing.md : spacing.lg,
  },
  title1: {
    fontSize: isMobile ? 24 : 28,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginBottom: 0,
  },
  title2: {
    fontSize: isMobile ? 12 : 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  categoryTitle: {
    fontSize: isMobile ? 16 : 20,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  spacer: {
    height: 2,
    backgroundColor: colors.accent,
    width: '90%',
    alignSelf: 'center',
    marginVertical: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.sm,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: isMobile ? 12 : 13,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    minHeight: isMobile ? 44 : 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isMobile ? 13 : 14,
  },
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
  },
  smallButtonText: {
    color: colors.white,
    fontSize: isMobile ? 11 : 12,
  },
  iconButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
  },
  iconButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: isMobile ? 11 : 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    textAlign: 'center',
  },
  footerText: {
    fontSize: isMobile ? 10 : 12,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    color: colors.text,
  },
  footerLink: {
    color: colors.link,
    textDecorationLine: 'underline',
    marginBottom: spacing.sm,
  },
});

export const categoryStyles = StyleSheet.create({
  container: {
    marginVertical: isMobile ? spacing.sm : spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'transparent',
    borderRadius: 0,
    alignItems: 'center',
    width: '95%',
  },
  image: {
    width: isMobile ? 100 : 120,
    height: isMobile ? 70 : 80,
    resizeMode: 'cover',
    marginVertical: spacing.md,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.sm,
  },
  addSection: {
    width: '100%',
    paddingVertical: spacing.sm,
    alignItems: 'center',
    gap: spacing.xs,
  },
  productList: {
    width: '100%',
    alignItems: 'center',
  },
});

export const productStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginVertical: spacing.xs,
    paddingVertical: spacing.sm,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  namePrice: {
    flexDirection: 'row',
    width: isMobile ? '60%' : '70%',
  },
  name: {
    width: '50%',
    fontSize: isMobile ? 12 : 14,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  },
  price: {
    width: '50%',
    fontSize: isMobile ? 12 : 14,
    textAlign: 'right',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  },
  actions: {
    flexDirection: 'row',
    gap: isMobile ? spacing.xs : spacing.sm,
  },
  actionButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: isMobile ? spacing.xs : spacing.sm,
    backgroundColor: '#eee',
    borderRadius: 6,
    minHeight: 40,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: isMobile ? 10 : 12,
  },
  danger: {
    backgroundColor: 'transparent',
  },
  dangerText: {
    color: colors.primaryDark,
  },
});

export const formStyles = StyleSheet.create({
  formContainer: {
    marginVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    width: '100%',
    alignItems: 'center',
    gap: spacing.xs,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: isMobile ? '90%' : '80%',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.sm,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: isMobile ? 12 : 13,
    backgroundColor: '#fff',
  },
  button: {
    width: isMobile ? '70%' : '60%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    minHeight: isMobile ? 44 : 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isMobile ? 13 : 14,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    minWidth: 60,
    backgroundColor: '#fff',
    fontSize: isMobile ? 11 : 12,
  },
});
