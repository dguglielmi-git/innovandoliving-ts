export const TRANSLATION_DE = {
  /****************************************************************
   *                Generic/System
   ****************************************************************/
  businessName: 'InnovandoLiving.',
  statusPending: 'Bestellung verarbeitet',
  statusInProgress: 'Bestellung in Bearbeitung',
  statusOnTheWay: 'Auf dem Weg',
  statusDelivered: 'Geliefert',
  labelShipping: 'Versand',
  continueShopping: 'Weiter einkaufen',

  /* Seo */
  seoTitle: 'Innovando Living Sessel',
  seoDescription: 'Beste Sessel in Argentinien',

  /****************************************************************
   *                Components
   ****************************************************************/

  /* Queue */
  msgQueueDate: 'Datum',
  msgQueueProduct: 'Produkt',
  msgQueueUsername: 'Benutzername',
  msgQueueUnreadMsgs: 'Ungelesene Nachrichten',

  /* Account - AddressForm */
  accountAddressFormErrorAddress: 'Fehler beim Erstellen der Adresse',
  accountAddressFormOkCreated: 'Die Adresse wurde korrekt erstellt',
  accountAddressFormErrorUpdate: 'Fehler beim Aktualisieren der Adresse',
  accountAddressFormOkUpdate: 'Die Adresse wurde erfolgreich aktualisiert',
  accountAddressFormAddressTitle: 'Titel der Adresse',
  accountAddressFormNameLastname: 'Name und Nachname',
  accountAddressFormAddress: 'Adresse',
  accountAddressFormCity: 'Stadt',
  accountAddressFormState: 'Zustand',
  accountAddressFormZipCode: 'Postleitzahl',
  accountAddressFormPhone: 'Telefonnummer',
  accountAddressFormButtonCreate: 'Adresse erstellen',
  accountAddressFormButtonUpdate: 'Adresse aktualisieren',

  /* Account - ChangeEmailForm */
  accountChangeEmailFormError: 'Fehler beim Aktualisieren der E-Mail',
  accountChangeEmailFormOkUpdate: 'Die E-Mail wurde erfolgreich aktualisiert',
  accountChangeEmailFormNewMail: 'Ihre neue E-Mail-Adresse',
  accountChangeEmailFormRepeat: 'Wiederholen Sie Ihre neue E-Mail-Adresse',
  accountChangeEmailButtonUpdate: 'Aktualisieren',
  accountChangeEmailButtonChangeEmail: 'Aktuelle E-Mail ändern:',

  /* Account - ChangeNameForm */
  accountChangeNameFormErrorUpdate:
    'Fehler beim Aktualisieren von Name und Nachname',
  accountChangeNameFormOkUpdate: 'Name und Nachname aktualisiert.',
  accountChangeNameFormChangeLabel: 'Ändern Sie Ihren Namen und Nachnamen',
  accountChangeNameFormNewName: 'Neuen Namen einfügen',
  accountChangeNameFormNewLastname: 'Neuen Nachnamen einfügen',
  accountChangeNameFormButtonUpdate: 'Aktualisieren',

  /* Account - ChangePasswordForm */
  accountChangePasswordFormErrorUpdate:
    'Fehler beim Aktualisieren des Passworts',
  accountChangePasswordFormOkUpdate:
    'Passwort wurde aktualisiert, bitte melden Sie sich erneut an.',
  accountChangePasswordFormChangePass: 'Kennwort ändern',
  accountChangePasswordFormInputPass: 'Neues Passwort eingeben',
  accountChangePasswordFormRepeatPass: 'Wiederhole das neue Passwort',
  accountChangePasswordFormButtonUpdate: 'Aktualisieren',

  /* Account - ListAddress */
  accountListAddressNewAddressTitle: 'Neue Adresse',
  accountListAddressAddAddress: 'Adresse hinzufügen',
  accountListAddressNotAddress: 'Keine Adressen auf der Liste',
  accountListAddressOkDelete: 'Die Adresse wurde erfolgreich gelöscht',
  accountListAddressErrorDelete: 'Fehler beim Versuch, die Adresse zu löschen',
  accountListAddressQuestionDelete: 'Möchten Sie die Adresse wirklich löschen?',
  accountListAddressEditLabel: 'Bearbeiten',
  accountListAddressPhoneLabel: 'Telefon. ',

  /* Auth */
  authLoginTitle: 'Anmeldung',
  authRegisterTitle: 'Anmeldeformular',

  /* Auth - LoginForm */
  authLoginFormErrorLogin:
    'Fehler beim Anmeldeversuch. Bitte überprüfen Sie Benutzer und Passwort',
  authLoginFormInputEmail: 'E-Mail-Addresse',
  authLoginFormInputPassword: 'Passwort',
  authLoginFormButtonRegister: 'Anmeldung',
  authLoginFormButtonLogin: 'Anmelden',
  authLoginFormButtonForgotPass: 'Hast du dein Passwort vergessen?',

  /* Auth - RegisterForm */
  authRegisterFormOkRegister: 'Benutzer erfolgreich registriert.',
  authRegisterFormErrorRegister:
    'Fehler beim Versuch, den Benutzer zu registrieren',
  authRegisterFormName: 'Name',
  authRegisterFormLastname: 'Nachname',
  authRegisterFormUsername: 'Nutzername',
  authRegisterFormEmail: 'E-Mail-Addresse',
  authRegisterFormPassword: 'Passwort',
  authRegisterFormButtonLogin: 'Anmelden',
  authRegisterFormButtonRegister: 'Registrieren',
  authRegisterFormLastnameRequired: 'Nachname ist erforderlich',

  /* Cart - AddressShipping */
  cartAddressShippingPreviousStep: 'Gehen Sie zurück zum vorherigen Schritt',
  cartAddressShippingBackToCart: 'Gehen Sie zurück zum Warenkorb',
  cartAddressShippingSelectAddress: 'Wählen Sie die Lieferadresse:',
  cartAddressShippingNotAddress: 'Keine Adressen auf der Liste',
  cartAddressShippingSelectPayment: 'Fortsetzen',
  cartAddressShippingSelectDelivery: 'Wählen Sie Ihre Lieferoption:',
  cartAddressShippingTakeAway: `Abholung im Büro des Verkäufers.`,
  cartAddressShippingTBD: 'Sprich die Lieferung später mit dem Verkäufer ab.',
  cartAddressShippingDeliveryHome: 'Versand (innerhalb von BSAS und Cap. Fed.)',
  cartAddressShippingDeliveryExternal:
    'Versand (außerhalb von BSAS und Cap. Fed.)',
  cartAddressShippingAddressNotSelected:
    'Sie müssen eine Adresse aus der Liste auswählen.',
  cartAddressShippingSelect: `Wählen Sie eine Adresse aus der Liste aus. Wenn die Liste keine Adresse enthält, fügen Sie eine neue hinzu, indem Sie auf die Schaltfläche „Adresse hinzufügen“ klicken.`,

  /* Cart - DeliveryExternal */
  deliveryExternalNoSelectedDocument: 'Kein Dokument ausgewählt',
  deliveryExternalTransportDataLabel: 'Adresse, wohin geliefert werden soll',
  deliveryExternalInvoiceData: `Rechnungsdaten`,
  deliveryExternalUseSameAddress: 'Verwenden Sie die Angaben der Lieferadresse',
  deliveryExternalContinueButtonLabel: 'Fortsetzen',

  /* Cart - DeliveryForm */
  deliveryFormTransportName: 'Name oder Firmenname',
  deliveryFormTransportAddress: 'Adresse',
  deliveryFormTransportCity: 'Stadt',
  deliveryFormTransportState: 'Zustand',
  deliveryFormTransportZipCode: 'Postleitzahl',
  deliveryFormTransportComments: 'Bemerkungen',

  /* Cart - InvoiceForm */
  invoiceFormName: 'Name oder Firmenname',
  invoiceFormAddress: 'Adresse',
  invoiceFormCity: 'Stadt',
  invoiceFormState: 'Zustand',
  invoiceFormZipCode: 'Postleitzahl',
  invoiceFormPhone: 'Telefonnummer',
  invoiceFormDocType: 'Dokumentenart',
  invoiceFormDocNumber: 'Dokumentnummer',

  /* Cart - FormPayment */
  cartPaymentFormPaymentOkDelivery: 'Bestellung verarbeitet',
  cartPaymentFormPaymentErrorDelivery:
    'Fehler bei der Bearbeitung der Bestellung.',
  cartPaymentFormPaymentButtonPay: 'Zahlen',

  /* Cart - Payment */
  cartPaymentTitlePay: 'Zahlung',

  /* Cart - SummaryCart */
  cartSummaryCartOrderDetail: 'Bestelldetails',
  cartSummaryCartUnitPrice: 'Stückpreis:',
  cartSummaryCartQuantity: 'Menge:',
  cartSummaryCartDelete: 'Entfernen',
  cartSummaryCartTotalCart: 'Gesamt:',
  cartSummaryCartContinuePurchase: 'nächster Schritt',
  cartSummaryLoadingCart: 'Einkaufswagen laden',
  cartSummaryEmptyCart: 'Der Einkaufswagen ist leer...',

  /* Cart - SummaryDetail */
  summaryDetailRemoveFromCart: 'Aus dem Warenkorb entfernen',
  summaryDetailAskForRemovalConfirmation:
    'Möchten Sie es aus dem Warenkorb entfernen?',

  /* Cart - SuccessfulPayment */
  cartSuccessfulPaymentTitle: 'Ihr Kauf wurde erfolgreich getätigt.',
  cartSuccessfulPaymentOrderNumber: 'Ticketnummer #',
  cartSuccessfulPaymentMsgFirstLine: `Im Abschnitt „Meine Bestellungen“ können Sie den Status Ihrer Bestellung überprüfen und mit unserer Verkaufsabteilung in Kontakt bleiben.`,
  cartSuccessfulPaymentMsgSecondLine:
    'Bei Fragen wenden Sie sich bitte an uns.',
  cartSuccessfulPaymentFooterThanks: 'Danke für ihren Einkauf!',

  /* Cart - PendingPayment */
  cartPendingPaymentTitle: `Die Bestellung wurde bearbeitet und steht zur Zahlung aus.`,
  cartPendingPaymentOrderNumber: 'Ticketnummer #',
  cartPendingPaymentMsgFirstLine: `Im Abschnitt „Meine Bestellungen“ können Sie die Bestellung verfolgen und bei Fragen mit unserer Verkaufsabteilung in Kontakt bleiben.`,

  /* Cart - FailurePayment */
  cartFailurePaymentTitle:
    'Die Bestellung konnte nicht korrekt bearbeitet werden.',
  cartFailurePaymentMsgFirstLine:
    'Sie müssen zum Warenkorb zurückkehren und die Zahlung Ihrer Produkte erneut versuchen.',

  /* Cart - FailurePayment */
  confirmCartButtonBackLabel: 'Gehen Sie zurück zu Lieferoptionen',
  confirmCartDetailEndOfPurchaseTitle: 'Letztes Detail Ihrer Bestellung',
  confirmCartDetailTotalLabel: 'Gesamt:',
  confirmCartDetailTotalWithShipment: 'Gesamt mit Versand:',
  confirmCartDetailShippingCost: 'Versandkosten: ',
  confirmCartDetailContinueButton: 'Fortsetzen',

  /* Cart - SepPurchase */
  stepPurchaseCheckingProducts: 'Produkte überprüfen',
  stepPurchaseSelectDeliveryOption: 'Liefermöglichkeit',
  stepPurchaseSelectConfirmOrder: 'Bestellung bestätigen',
  stepPurchasePayOrder: 'Bestellung bezahlen',
  stepPurchaseProgressTitle: `Auftragsfortschritt`,

  /* Header - Menu */
  headerMenuCategories: 'Kategorie',
  headerMenuMyAccount: 'Mein Konto',
  headerMenuOptions: 'Optionen',
  headerMenuMyOrders: 'Meine Bestellungen',
  headerMenuFavorites: 'Favoriten',
  headerMenuShowroom: 'Ausstellungsraum',
  headerMenuAccount: 'Konto',
  headerMenuProducts: 'Produkte',
  headerMenuQueries: 'Abfragen',
  headerMenuProductManagement: 'Produktverwaltung',

  /* Orders - Order */
  orderTabActive: 'Aktive Bestellungen',
  orderTabClosed: 'Abgeschlossene Bestellungen',
  orderTitle: 'Meine Bestellungen',
  orderListEmptyLabel: 'Keine Bestellungen.',
  ordersOrderPurchaseOnItsWay:
    'Die Bestellung wurde an folgende Adresse gesendet:',
  orderLoading: 'Bestellungen werden geladen...',
  orderUpdateStatus: 'Update Status',

  /* Orders - ProgressOrder */
  progressOrderTitle: `Auftragsfortschritt`,

  /* Orders - Comments */
  commentsSupportContact: 'Fragen und Antworten zu diesem Produkt',
  commentsHistory: 'Geschichte der Kommunikation mit der Verkaufsabteilung',
  commentsNoMessages: '... keine Nachrichten ...',

  /* Orders - ItemsTable */
  itemsTableHeaderOfList: 'In der Bestellung enthaltene Artikel',
  itemsTableImageHeader: 'Bild',
  itemsTableItemDescriptionHeader: 'Artikel',
  itemsTableQuantityHeader: 'Menge',
  itemsTablePriceHeader: 'Preis',
  itemsTableTotalPriceHeader: 'Gesamt',

  /* Orders - OrderDetails */
  orderDetailsBackButton: 'Zurück',
  orderDetailSendCommentLabel: 'Nachricht senden',
  orderDetailTicketNumberLabel: 'Befehl #:',
  orderDetailOrderDateLabel: 'Datumsreihenfolge:',
  orderDetailStatusLabel: 'Status:',
  orderDetailPendingPayment: 'Ausstehende Zahlung',

  /* Orders - OrderTable */
  orderTableDateRowLabel: 'Startdatum',
  orderTableClosedDateRowLabel: 'Geschlossenes Datum',
  orderTableOrderNumberLabel: 'Befehl #',
  orderTableTotalOrderLabel: 'Gesamtbestellung',
  orderTableStatusLabel: 'Status',
  orderTableUnreadMsgLabel: 'ungelesene Nachrichten',
  orderTableSeeDetailButtonLabel: 'Siehe Detail',
  orderTableNoOrderProcessed: 'Keine bearbeiteten Bestellungen.',

  /* Producto - HeaderProducto */
  productoHeaderProductoDelivery24: 'Lieferung in 24/48h',
  productoHeaderProductoQuantity: 'Menge',
  productoHeaderProductoSalesPrice: 'Verkaufspreis:',
  productoHeaderProductoAddToCart: 'in den Warenkorb legen',
  productoHeaderAddCartLogoff:
    'Um Artikel zu Ihrem Warenkorb hinzuzufügen, müssen Sie sich bei Ihrem Konto anmelden.',
  productoHeaderGoBackButton: 'Geh zurück',

  /* Producto - InfoProducto */
  productoInfoProductoReleaseDate: 'Veröffentlichungsdatum:',

  /* Producto - TabsProducto */
  productGalleryLabel: 'Galerie:',
  productQuestions: 'Fragen',

  /* Product Management */
  pmCategoryRemovedSuccessfully: 'Der ausgewählte Eintrag wurde entfernt.',
  pmErrorRemovingCategory:
    'Fehler beim Versuch, die ausgewählte Kategorie zu entfernen.',
  pmOperationCancelCategory: 'Operation abgebrochen',
  pmRemoveCategoryDialog: 'Möchten Sie diese Kategorie löschen?',
  pmRemoveCategoryDialogTitle: 'Löschbestätigung',
  pmCategoryAddedSuccessfully:
    'Die neue Kategorie wurde erfolgreich hinzugefügt.',
  pmCategoryTitleAddedSuccessfully: 'Bestätigt',
  pmCategoryTitleAddError: 'Fehler',
  pmCategoryTitleAddRejected: 'Abgelehnt',
  pmCategoryTitle: 'Kategorien',
  pmCategoryLabelTitle: 'Titel',
  pmCategoryLabelOptions: 'Optionen',
  pmCategoryLabelButtonAdd: 'Hinzufügen',
  pmCategoryUpdateModalTitle: 'Kategorie hinzufügen',
  pmCategoryUpdateModalCancelButton: 'Abbrechen',
  pmCategoryRemoveTooltip: 'Entfernen',
  pmAddCategoryModalMsg:
    'Geben Sie den Namen der neuen Kategorie ein und drücken Sie dann die Schaltfläche `Hinzufügen`.',
  pmAddCategoryModalPlaceholder: 'Neue Kategorie',
  pmProdManagementTitle: 'Produktverwaltung',
  pmProdManagementTotalCategories: 'Gesamtzahl der Kategorien',
  pmProdManagementtotalProducts: 'Gesamtzahl der Produkte',
  pmProdManagementProdLabelButtonAdd: 'Produkt hinzufügen',
  pmAcceptRemoveProductTitle: 'Bestätigt',
  pmProductRemovedSuccessfully: 'Das ausgewählte Produkt wurde entfernt.',
  pmProductTitleError: 'Fehler',
  pmProductTitleRejected: 'Abgelehnt',
  pmProductErrorRemoving:
    'Fehler beim Versuch, das ausgewählte Produkt zu entfernen.',
  pmProductOperationCancel: 'Operation abgebrochen.',
  pmProductRemoveConfirm: 'Möchten Sie dieses Produkt löschen?',
  pmProductDeleteConfirmation: 'Löschbestätigung',
  pmProductEditTooltip: 'Bearbeiten',
  pmProductRemoveTooltip: 'Entfernen',
  pmProductTitle: 'Produkte',
  pmProductSearchPlaceholder: 'Suchen',

  /* Status */
  statusOrdered: 'Bestellt',
  statusInProgress: 'In Bearbeitung',
  statusShipped: 'Versendet',
  statusDelivered: 'Geliefert',
  statusDelayed: 'Verspätet',
  statusCancelled: 'Abgesagt',
  statusDeclined: 'Abgelehnt',
  statusRefunded: 'Erstattet',
  statusDisputed: 'Umstritten',
  statusPartiallyRefunded: 'Teilweise erstattet',
  statusAwaitingPickup: 'Warten auf Abholung',
  statusPartiallyShipped: 'zum Teil versandt',
  statusPendingPayment: 'Ausstehende Zahlung',
  statusPartiallyPaid: 'Teilweise bezahlt',
  statusClosed: 'Abgeschlossen',
  statusUnknown: 'Unbekannt',

  /* UpdateModal ProgressOrder*/
  modalProgressOrderHeader: 'Möchten Sie den Status der Bestellung ändern?',
  modalProgressOrderChildrenLabel: `Wählen Sie aus der Liste den neuen Status für die Bestellung aus und klicken Sie dann auf die Schaltfläche „Aktualisieren“.`,
  modalProgressOrderUpdateButton: 'Aktualisieren',
  modalProgressOrderCancelButton: 'Abbrechen',

  /* ComboStatus */
  comboStatusPlaceholder: 'Wählen Sie das Bundesland',

  /* Questions */
  questionsHeader: 'Stellen Sie eine Frage zu diesem Produkt!',
  questionsSendMessageLabel: 'Frage senden',
  questionsLoadingProduct: 'Produktinformationen werden geladen',
  questionsErrorSendQuestionNotLogged:
    'Sie müssen angemeldet sein, um Produktfragen zu stellen.',
  questionsNoComments: 'keine Kommentare',

  /* Queries */
  queriesSendReply: 'Antwort senden',
  queriesChatHeader: 'Anfragen von Kunden',
  queriesLoadingQueries: 'Abfragen werden geladen...',
  queriesUserTitle: 'Fragen zum Produkt',
  queriesUserDataTableDateHeader: 'Datum',
  queriesUserDataTableProductHeader: 'Produkt',
  queriesUserDataTableUnreadMsgHeader: 'ungelesene Nachrichten',
  queriesUserDialogRouterMessage: 'Möchten Sie die Produktseite öffnen?',
  queriesUserDialogRouterHeader: 'Gehen Sie zu Produkt',
  queriesUserDialogYesButton: 'Ja',
  queriesUserDialogRejectButton: 'Abbrechen',

  /* PaymentMethod */
  paymentMethodFormHeader: 'Wählen Sie eine Bezahlart',
  paymentMethodOptionCash: 'Kasse',
  paymentMethodOptionCreditCard: 'Kreditkarte (MercadoPago)',
  paymentMethodOptionCashAndCard: 'Bargeld & Kreditkarte (MercadoPago)',
  paymentMethodSubmitButtonLabel: 'Ziel',

  /* CashAndCard */
  cashAndCardAmountNotEqualTotal: `Der Betrag in beiden Feldern stimmt nicht mit dem Gesamtbetrag überein.`,
  cashAndCardErrorInQuantities: `Beträge dürfen nicht 0 sein. Bitte geben Sie in jedem Feld einen Betrag an.`,
  cashAndCardNegativeValuesInFields: `Die Felder enthalten negative Werte. Bitte korrigieren Sie diese, um fortzufahren.`,
  cashAndCardHeaderLabel: 'Gesamtrechnung:',
  cashAndCardAmountInCashLabel: 'Geben Sie den in bar zu zahlenden Betrag an',
  cashAndCardAmountInCreditCardLabel:
    'Geben Sie den per Kreditkarte zu zahlenden Betrag an',

  /* ModalPayRec */
  modalPayRecHeader: 'Bestellung als Zahlungseingang markieren',
  modalPayRecContent: `1* - Wählen Sie die Option(en), die Sie als bezahlt markieren möchten, aus der Liste unten aus. Nach dem Aktualisieren dieser Daten wird der ausstehende Saldo auf Null aktualisiert.`,
  modalPayRecContentSecond: `2* - Nachdem Sie die Waage(n) ausgewählt haben, die Sie aktualisieren möchten, klicken Sie auf die Schaltfläche „Ja“, um die Änderungen im System zu speichern.`,
  modalPayCancelButton: 'Abbrechen',
  modalPayConfirmButton: 'Aktualisieren',
  modalPayUpdatedOk: 'Wert erfolgreich aktualisiert.',
  modalPayErrorUpdate: 'Fehler beim Versuch, den Betrag zu aktualisieren',
  modalPayTotalOustandingBalance: 'Gesamtausstehender Betrag: ',
  modalPayAmountReceivedTitle: 'erhaltener Betrag',
  modalPayAmountReceivedLabel: 'Erhaltener Betrag',
  modalPayAmountReceivedPlaceholder: 'Sollte weniger sein als: ',
  modalPayAmountReceivedError: 'Betrag ist höher als ausstehend',
  modalPayBalanceUpdatingConfirmation:
    'Möchten Sie den ausstehenden Betrag wirklich aktualisieren?',

  /* OptionsOrderStatus */
  optionsOrderStatusButtonLocked: 'Zahlung erhalten',
  optionsOrderStatusMessageOrderLocked:
    'Diese Bestellung ist bis zum Zahlungseingang gesperrt',

  /* SystemSettings */
  systemSettingsHeader: 'Systemeinstellungen',
  systemSettingsWarehouseAddress: 'Lageradresse',
  systemSettingsWarehouseAddressPlaceholder:
    'Lageradresse, z. B.: (Straße 123, Stadt, Bundesland, Land)',
  systemSettingsRateKm: 'Preis pro km',
  systemSettingsRateKmPlaceholder:
    'Preis pro km, wenn der Preis pro km beispielsweise 50 $ beträgt, geben Sie 50 ohne das $-Symbol ein',
  systemSettingsMinimumKmDelivery: 'Mindestkilometer für den Tarif pro km',
  systemSettingsMinimumKmDeliveryPlaceholder:
    'Legen Sie einen Festpreis für Entfernungen unter dem Mindestkilometer fest',
  systemSettingsUpdateButton: 'Aktualisieren',
  systemSettingsErrorUpdating:
    'Fehler beim Versuch, die Einstellungen zu aktualisieren',
  systemSettingsSuccessUpdating:
    'Die Einstellungen wurden erfolgreich aktualisiert',
  systemSettingsExternalProviderPrice:
    'Lieferpreis für einen externen Anbieter',
  systemSettingsExternalProviderPricePlaceholder:
    'Fügen Sie den Preis für den Lieferservice eines externen Anbieters hinzu',

  /****************************************************************
   *                Pages
   ****************************************************************/

  /* Productos - Platform */
  productosPlatformLoadingProds: 'Produkte laden',
  productosPlatformNotProductFound: 'Keine Produkte gefunden',

  /* _app */
  appAddProduct: 'Um Produkte hinzuzufügen, müssen Sie sich anmelden',

  /* index */
  indexLoadingProducts: 'Produkte laden',
  indexNotProductFound: 'Keine Produkte gefunden',
  indexMainTitle: 'Unsere Produkte',

  /* orders */
  ordersMyOrders: 'Meine Bestellungen',
  ordersNotOrdersFound: 'Es wurden keine Bestellungen gefunden.',
  ordersOrderList: 'Bestellliste',

  /* search */
  searchLoadingProducts: 'Produkte suchen',
  searchProductsNotFound: 'Keine Produkte gefunden',

  /* wishlist */
  wishlistTitle: 'Wunschzettel',
  wishlistLoadingProducts: 'Produkte laden',
  wishlistNotProductsOnList: 'Ihre Liste enthält keine Produkte',

  /* payment */
  paymentProcessing: 'Kauf bearbeiten...',

  /* account */
  accountConfigurationTitle: 'Aufbau',
  accountAddressTitle: 'Adressen',

  /* pictureGallery */
  pictureGalleryConfirmDeleteSummary: 'Erfolgreich entfernt',
  pictureGalleryConfirmDeleteDetail: 'Bild wurde aus der Galerie entfernt',
  pictureGalleryConfirmDeleteRejected: 'Vorgang abgebrochen',
  pictureGalleryConfirmDeleteRejectedSummary: 'Abgelehnt',
  pictureGalleryConfirmDeleteQuestion: 'Möchten Sie diesen Eintrag löschen?',
  pictureGalleryConfirmDeleteHeader: 'Löschbestätigung',
  pictureGalleryProductRemoveLabel: 'Entfernen',

  /* uploadFiles */
  uploadFilesEmptyContainer: 'Bild hierher ziehen und ablegen',

  /* addEditProduct */
  addEditProductTitle: 'Produkttitel',
  addEditProductPlaceHolder: 'Produkttitel',
  addEditProductBriefDescriptionLabel: 'Zusammenfassung / Kurzbeschreibung',
  addEditProductBriefDescriptionPlaceholder: 'Kurzbeschreibung',
  addEditProductCategoryLabel: 'Kategorie',
  addEditProductPriceLabel: 'Preis $',
  addEditProductPricePlaceholder: 'Preis $',
  addEditProductDiscountLabel: 'Rabatt % (0-100)',
  addEditProductDiscountPlaceholder: 'Rabatt ',
  addEditProductReleaseLabel: 'Veröffentlichungsdatum',
  addEditProductPublishCheckboxLabel:
    'Dieses Produkt auf der Hauptseite veröffentlichen',

  /* addProduct */
  addProductSuccessfullyUpdated: 'Produkt wurde erfolgreich aktualisiert',
  addProductSuccessfullyAddImages:
    'Produkt erfolgreich erstellt, Sie können nun Bilder zum Produkt hinzufügen.',
  addProductErrorAddingProduct:
    'Es gab ein Problem beim Speichern der Datei, überprüfen Sie die eingegebenen Daten und versuchen Sie es erneut',
  addProductErrorUploadingFiles:
    'Es gab ein Problem beim Hochladen der Datei, überprüfen Sie die eingegebenen Daten und versuchen Sie es erneut',
  addProductTitleForEdition: 'Produktdetails',
  addProductSaveChangesButtonLabel: 'Änderungen speichern',
  addProductCreateProductButtonLabel: 'Erstellen',

  /* addEditProductPicture */
  addEditProductPictureErrorFileSize:
    'Dateifehler: Bitte stellen Sie sicher, dass die Dateigröße kleiner als 1 MB ist.',
  addEditProductPictureSuccessfullyRemoved: 'Erfolgreich entfernt',
  addEditProductPictureMainPictureRemoved: 'Das Hauptbild wurde entfernt',
  addEditProductPictureErrorRemovingMainPic:
    'Fehler beim Versuch, das Hauptbild zu entfernen',
  addEditProductPictureUploadPictureLabel: 'Bild hochladen',
  addEditProductPictureMultiplePictureTitle:
    'Mehrere Bilder zur Produktgalerie hinzufügen',
  addEditProductPicturePicsAdded: 'Bilder zum Produkt hinzugefügt',
  addEditProductPictureImageGalleryEmpty:
    'Die Bildgalerie ist für dieses Produkt leer',

  /* productManagementProducts */
  productManagementProductsPictureHeader: 'Bild',
  productManagementProductsTitleHeader: 'Titel',
  productManagementProductsPriceHeader: 'Preis',
  productManagementProductsCategoryHeader: 'Kategorie',
  productManagementProductsOptionsHeader: 'Optionen',

  /****************************************************************
   *                Other Messagess
   ****************************************************************/

  cartProductAlreadyInCart: 'Dieses Produkt befindet sich bereits im Warenkorb',
  cartProductAddedSuccessfully: 'Dieses Produkt ist schon im Einkaufswagen',
  cartItemRemovedSuccessfully: 'Artikel wurde aus dem Warenkorb entfernt',
  cartErrorTryingToDeleteItem:
    'Beim Versuch, das Element zu entfernen, ist ein Fehler aufgetreten.'
}
