import {
  BIBTEX_ABS_DEFAULT_MAX_AUTHOR,
  BIBTEX_DEFAULT_AUTHOR_CUTOFF,
  BIBTEX_DEFAULT_MAX_AUTHOR,
  Database,
  ExportApiJournalFormat,
  ExternalLinkAction,
  IADSApiUserDataResponse,
  JournalFormatName,
  UserDataKeys,
} from '@api';

export const DEFAULT_USER_DATA: IADSApiUserDataResponse = {
  [UserDataKeys.HOMEPAGE]: 'Modern Form',
  [UserDataKeys.LINK_SERVER]: '',
  [UserDataKeys.CUSTOM_FORMATS]: [],
  [UserDataKeys.BIBTEX_FORMAT]: '',
  [UserDataKeys.DEFAULT_DATABASE]: [
    { name: Database.Physics, value: false },
    { name: Database.Astronomy, value: false },
    { name: Database.General, value: false },
  ],
  [UserDataKeys.BIBTEX_MAX_AUTHORS]: BIBTEX_DEFAULT_MAX_AUTHOR.toString(),
  [UserDataKeys.LAST_MESSAGE]: '',
  [UserDataKeys.ABS_FORMAT]: '',
  [UserDataKeys.BIBTEX_AUTHOR_CUTOFF]: BIBTEX_DEFAULT_AUTHOR_CUTOFF.toString(),
  [UserDataKeys.EXTERNAL_LINK_ACTION]: ExternalLinkAction.Auto,
  [UserDataKeys.ABS_MAX_AUTHORS]: BIBTEX_ABS_DEFAULT_MAX_AUTHOR.toString(),
  [UserDataKeys.BIBTEX_JOURNAL_FORMAT]: JournalFormatName.AASTeXMacros,
  [UserDataKeys.DEFAULT_EXPORT_FORMAT]: 'BibTeX',
  [UserDataKeys.DEFAULT_HIDE_SIDEBARS]: 'Show',
  [UserDataKeys.MIN_AUTHOR_RESULT]: '4',
  [UserDataKeys.ABS_AUTHOR_CUTOFF]: BIBTEX_DEFAULT_AUTHOR_CUTOFF.toString(),
};

// JournalFormatName is the values of bibtex journal format values from user data settings
// It is mapped to journal format value used in export citation
export const JournalFormatMap: Record<JournalFormatName, ExportApiJournalFormat> = {
  [JournalFormatName.AASTeXMacros]: ExportApiJournalFormat.AASTeXMacros,
  [JournalFormatName.Abbreviations]: ExportApiJournalFormat.Abbreviations,
  [JournalFormatName.FullName]: ExportApiJournalFormat.FullName,
};
