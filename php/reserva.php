<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $nome = filter_var(trim($_POST["nome"]), FILTER_SANITIZE_STRING);
    $como_encontrou = filter_var(trim($_POST["como-encontrou"]), FILTER_SANITIZE_STRING);
    $nome_indicado = filter_var(trim($_POST["nome-indicado"]), FILTER_SANITIZE_STRING);
    $telefone = filter_var(trim($_POST["telefone"]), FILTER_SANITIZE_STRING);
    $contato_preferencia = filter_var(trim($_POST["contato-preferencia"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $captcha = filter_var(trim($_POST["captcha"]), FILTER_SANITIZE_STRING);
    $adultos = filter_var(trim($_POST["adultos"]), FILTER_SANITIZE_NUMBER_INT);
    $criancas = filter_var(trim($_POST["criancas"]), FILTER_SANITIZE_NUMBER_INT);
    $complemento = filter_var(trim($_POST["complemento"]), FILTER_SANITIZE_STRING);

    // Basic validation
    if (!$nome || !$como_encontrou || !$telefone || !$contato_preferencia || !$email || !$captcha || !$adultos || $adultos < 1 || $criancas === false || !$complemento) {
        http_response_code(400);
        echo json_encode(["message" => "Por favor, preencha todos os campos obrigatórios corretamente."]);
        exit;
    }

    // TODO: Add captcha validation here if implemented

    $to_responsavel = "dani.tst28@gmail.com";
    $whatsapp_responsavel = "81985882547";

    $subject_responsavel = "Nova Reserva Recebida";
    $message_responsavel = "Você recebeu uma nova reserva:\n\n";
    $message_responsavel .= "Nome: $nome\n";
    $message_responsavel .= "Como encontrou: $como_encontrou\n";
    if ($como_encontrou === "Indicação") {
        $message_responsavel .= "Nome da pessoa indicada: $nome_indicado\n";
    }
    $message_responsavel .= "Telefone: $telefone\n";
    $message_responsavel .= "Preferência de contato: $contato_preferencia\n";
    $message_responsavel .= "E-mail: $email\n";
    $message_responsavel .= "Adultos: $adultos\n";
    $message_responsavel .= "Crianças: $criancas\n";
    $message_responsavel .= "Complemento: $complemento\n";

    $headers_responsavel = "From: no-reply@beachflats.com\r\n";
    $headers_responsavel .= "Reply-To: $email\r\n";

    $mail_responsavel = mail($to_responsavel, $subject_responsavel, $message_responsavel, $headers_responsavel);

    // Email to client
    $to_cliente = $email;
    $subject_cliente = "Confirmação de Reserva - Beach Flats";
    $message_cliente = "Olá $nome,\n\n";
    $message_cliente .= "Recebemos sua reserva com sucesso. Em breve, o responsável entrará em contato.\n\n";
    $message_cliente .= "Obrigado por escolher Beach Flats!\n";

    $headers_cliente = "From: no-reply@beachflats.com\r\n";

    $mail_cliente = mail($to_cliente, $subject_cliente, $message_cliente, $headers_cliente);

    // Generate WhatsApp message links
    $whatsapp_message = urlencode("Olá $nome, sua reserva foi recebida com sucesso. Em breve entraremos em contato. Obrigado por escolher Beach Flats.");
    $whatsapp_link_cliente = "https://wa.me/" . preg_replace('/\D/', '', $telefone) . "?text=" . $whatsapp_message;
    $whatsapp_link_responsavel = "https://wa.me/$whatsapp_responsavel?text=" . urlencode("Nova reserva de $nome. Telefone: $telefone, Email: $email.");

    // Return JSON with success and WhatsApp links
    if ($mail_responsavel && $mail_cliente) {
        http_response_code(200);
        echo json_encode([
            "message" => "Reserva realizada com sucesso.",
            "whatsapp_cliente" => $whatsapp_link_cliente,
            "whatsapp_responsavel" => $whatsapp_link_responsavel
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao enviar o e-mail. Por favor, tente novamente mais tarde."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido."]);
}
?>
