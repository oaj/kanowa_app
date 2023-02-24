import {sendEmail} from "@/lib/email";

export class MailService {

    private USER = "user"
    private COLONY = "colony"
    private RESIDENCE = "residence"
    private CONTACT = "contact"
    private ROLE = "role"
    private REGISTER = "register"
    private BASE_URL = "baseUrl"
    private DEFAULT_LANG = "es"
    private mailFrom = process.env.MAIL_FROM
    private mailBaseUrl = process.env.MAIL_BASEURL

    const sendEmail = async (to: string, subject: string, content: string) => {

        const emailPayload = {
            to: to,
            subject: subject,
            html: content
        }

        try {
            const info = await sendEmail(emailPayload)
        } catch (e) {
            console.log('Error sending email:', e)
        }
    }

    sendEmailFromTemplate(user: User, templateName: string, titleKey: string) {
    Locale
    locale = Locale.forLanguageTag(user.getLangKey());
    System
.
    out
.

    println(

    "--------------------------------------------------------------------------------------------------------------------------"
);
    log
.

    debug(

    "email.activation.title = "
+
    messageSource
.

    getMessage(

    "email.activation.title"
,
    null
,
    Locale
.
    ENGLISH
));
    System
.
    out
.

    println(

    "email.activation.title === "
+
    messageSource
.

    getMessage(

    "email.activation.title"
,
    null
,
    Locale
.
    ENGLISH
));
    System
.
    out
.

    println(

    "--------------------------------------------------------------------------------------------------------------------------"
);

    Context
    context = new Context(locale);
    context
.

    setVariable(USER, user);

    context
.

    setVariable(BASE_URL, mailBaseUrl);

    String
    content = templateEngine.process(templateName, context);
    String
    subject = messageSource.getMessage(titleKey, null, locale);

    sendEmail(user

.

    getEmail()

,
    subject
,
    content
,
    false
,
    true
);

}

@Async
public
void sendActivationEmail(User
user
)
{
    log.debug("Sending activation email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "activationEmail", "email.activation.title");
}

@Async
public
void sendCreationEmail(User
user
)
{
    log.debug("Sending creation email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "creationEmail", "email.activation.title");
}

@Async
public
void sendPasswordResetMail(User
user
)
{
    log.debug("Sending password reset email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "passwordResetEmail", "email.reset.title");
}

@Async
public
void sendSocialRegistrationValidationEmail(User
user, String
provider
)
{
    log.debug("Sending social registration validation email to '{}'", user.getEmail());
    Locale
    locale = Locale.forLanguageTag(user.getLangKey());
    Context
    context = new Context(locale);
    context.setVariable(USER, user);
    context.setVariable("provider", StringUtils.capitalize(provider));
    String
    content = templateEngine.process("socialRegistrationValidationEmail", context);
    String
    subject = messageSource.getMessage("email.social.registration.title", null, locale);
    sendEmail(user.getEmail(), subject, content, false, true);
}

//    @Async
//    public void sendColonyCreationEmail(Colony colony, Contact contact, Boolean register) {
//        sendColonyCreationEmail(colony, contact, register, getBaseUrl());
//    }
@Async
public
void sendColonyCreationEmail(Colony
colony, User
contact, Boolean
register
)
{
    log.debug("Sending colony created e-mail to '{}'", contact.getEmail());
    Locale
    locale = Locale.forLanguageTag(contact.getUsername() != null ? contact.getLangKey() : DEFAULT_LANG);
    Context
    context = new Context(locale);
    context.setVariable(COLONY, colony);
    context.setVariable(CONTACT, contact);
    context.setVariable(REGISTER, register);
    context.setVariable(BASE_URL, mailBaseUrl);
    String
    content = templateEngine.process("colonyCreationEmail", context);
    String
    subject = messageSource.getMessage("email.colony.creation.title", null, locale);
    sendEmail(contact.getEmail(), subject, content, false, true);
}

//    @Async
//    public void sendColonyRoleEmail(Colony colony, Contact contact, ColonyRole role, boolean register) {
//        sendColonyRoleEmail(colony, contact, role, register, getBaseUrl());
//    }
@Async
public
void sendColonyRoleEmail(Colony
colony, User
contact, ColonyRole
role, boolean
register
)
{
    log.debug("Sending e-mail about new role as '{}' in colony '{}' to '{}'", role, colony.getName(), contact.getEmail());
    Locale
    locale = Locale.forLanguageTag(contact.getUsername() != null ? contact.getLangKey() : DEFAULT_LANG);
    Context
    context = new Context(locale);
    context.setVariable(COLONY, colony);
    context.setVariable(CONTACT, contact);
    context.setVariable(ROLE, role);
    context.setVariable(REGISTER, register);
    context.setVariable(BASE_URL, mailBaseUrl);
    String
    content = templateEngine.process("colonyRoleEmail", context);
    String
    subject = messageSource.getMessage("email.colony.role.title", null, locale);
    sendEmail(contact.getEmail(), subject, content, false, true);
}

//    @Async
//    public void sendEndColonyRoleEmail(Colony colony, Contact contact, ColonyRole role) {
//        sendEndColonyRoleEmail(colony, contact, role, getBaseUrl());
//    }
@Async
public
void sendEndColonyRoleEmail(Colony
colony, User
contact, ColonyRole
role
)
{
    log.debug("Sending e-mail about ending role as '{}' in colony '{}' to '{}'", role, colony.getName(), contact.getEmail());
    Locale
    locale = Locale.forLanguageTag(contact.getUsername() != null ? contact.getLangKey() : DEFAULT_LANG);
    Context
    context = new Context(locale);
    context.setVariable(COLONY, colony);
    context.setVariable(CONTACT, contact);
    context.setVariable(ROLE, role);
    context.setVariable(BASE_URL, mailBaseUrl);
    String
    content = templateEngine.process("colonyEndRoleEmail", context);
    String
    subject = messageSource.getMessage("email.colony.role.title", null, locale);
    sendEmail(contact.getEmail(), subject, content, false, true);
}

//    @Async
//    public void sendResidenceRoleEmail(Colony colony, Residence residence, Contact contact, ResidenceRole role, boolean register) {
//        sendResidenceRoleEmail(colony, residence, contact, role, register, getBaseUrl());
//    }
@Async
public
void sendResidenceRoleEmail(Colony
colony, Residence
residence, User
contact, ResidenceRole
role, boolean
register
)
{
    log.debug("Sending e-mail about new role as '{}' in residence {} in colony '{}' to '{}'", role, residence.getDoorNumber(), colony.getName(), contact.getEmail());
    Locale
    locale = Locale.forLanguageTag(contact.getUsername() != null ? contact.getLangKey() : DEFAULT_LANG);
    Context
    context = new Context(locale);
    context.setVariable(COLONY, colony);
    context.setVariable(RESIDENCE, residence);
    context.setVariable(CONTACT, contact);
    context.setVariable(ROLE, role);
    context.setVariable(REGISTER, register);
    context.setVariable(BASE_URL, mailBaseUrl);
    String
    content = templateEngine.process("residenceRoleEmail", context);
    String
    subject = messageSource.getMessage("email.residence.role.title", null, locale);
    sendEmail(contact.getEmail(), subject, content, false, true);

}

//    @Async
//    public void sendEndResidenceRoleEmail(Colony colony, Residence residence, Contact contact, ResidenceRole role) {
//        sendEndResidenceRoleEmail(colony, residence, contact, role, getBaseUrl());
//    }
@Async
public
void sendEndResidenceRoleEmail(Colony
colony, Residence
residence, User
contact, ResidenceRole
role
)
{
    log.debug("Sending e-mail about ending role as '{}' in residence {} in colony '{}' to '{}'", role, residence.getDoorNumber(), colony.getName(), contact.getEmail());
    Locale
    locale = Locale.forLanguageTag(contact.getUsername() != null ? contact.getLangKey() : DEFAULT_LANG);
    Context
    context = new Context(locale);
    context.setVariable(COLONY, colony);
    context.setVariable(RESIDENCE, residence);
    context.setVariable(CONTACT, contact);
    context.setVariable(ROLE, role);
    context.setVariable(BASE_URL, mailBaseUrl);
    String
    content = templateEngine.process("residenceEndRoleEmail", context);
    String
    subject = messageSource.getMessage("email.residence.role.title", null, locale);
    sendEmail(contact.getEmail(), subject, content, false, true);
}
}
