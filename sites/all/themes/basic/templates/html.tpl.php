<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"
  <?php print $rdf_namespaces; ?>>

<head profile="<?php print $grddl_profile; ?>">
  <meta name="google-site-verification" content="W0okEQOYn-NLwrTx8Q56gh9W2KKQqgK7uR_VsDvpv1o" />
  <?php print $head; ?>
  <title><?php print !isset($head_title_array['title']) ? "Chabad on Campus UK" : $head_title_array['title']; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="main-wrapper">
    <?php print $page_top; ?>
    <?php print $page; ?>
    <?php print $page_bottom; ?>
    <div id="footer">Chabad on Campus UK - A branch of Chabad Lubavitch UK charity number 227638 - for more information please email info@chabadoncampus.org.uk<?php if(!$user->uid): ?><span id="login-link"><a href="/user">Login</a></span><?php endif ?></div>
  </div>
</body>
</html>
