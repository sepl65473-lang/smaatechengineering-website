output "cloudfront_domain" {
  value = aws_cloudfront_distribution.site.domain_name
}
output "s3_bucket_name" {
  value = aws_s3_bucket.site.id
}
output "acm_validation_records" {
  value = [
    for dvo in aws_acm_certificate.cert.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
}
