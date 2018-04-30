<?php

namespace Drupal\adminx_app\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityTypeManager;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class CalendarAppController.
 */
class AppController extends ControllerBase {

  /**
   * EntityTypeManager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * EntityFieldManager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;


  /**
   * CalendarAppController constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManager $entityTypeManager
   */
  public function __construct(EntityTypeManager $entityTypeManager, EntityFieldManager $entityFieldManager) {
    $this->entityTypeManager = $entityTypeManager;
    $this->entityFieldManager = $entityFieldManager;
  }

  /**
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *
   * @return static
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity_field.manager')
    );
  }

  /**
   * View.
   *
   * @return array
   *   Drupal render array.
   */
  public function view() {

    $markup = <<<MARKUP
<div class="loading-indicator-wrapper">
    <div class="loading-indicator-overlay">
      <div class="loading-indicator-overlay__bar"></div>
      <div class="loading-indicator-overlay__bar"></div>
      <div class="loading-indicator-overlay__bar"></div>
    </div>
</div>
MARKUP;
    $user = User::load($this->currentUser()->id());
    return [
      '#theme' => 'adminx_app',
      '#placeholder' => [
        '#markup' => $markup,
      ],
      '#attached' => [
        'library' => [
          'adminx/app',
        ],
        'drupalSettings' => [
          'current_user' => [
            'roles' => $this->currentUser->getRoles(),
          ],
          'field_definitions' => $this->getAllFieldDefinitions(),
          'language' => $this->languageManager()->getCurrentLanguage()->getId(),
        ],
      ],
    ];
  }

  /**
   * @return array
   */
  public function getAllFieldDefinitions() {
    $definitions = [];
    $default_field_list = [
      'id',
    ];
    $get_bundles = [
      'node' => [
        'article' => [
          'field_date',
          'field_booking_status',
          'field_date_gate_entry',
          'field_date_gate_exit',
          'field_vehicle_license',
        ] + $default_field_list,
        'page' => [
          'field_date',
        ] + $default_field_list,
      ],
    ];
    foreach ($get_bundles as $entity_type => $bundles) {
      foreach ($bundles as $bundle => $field_list) {
        $definitions[$entity_type][$bundle] = $this->getFieldDefinitions($entity_type, $bundle, $field_list);
      }
    }

    return $definitions;
  }

  /**
   * @param string $entity_type
   * @param string $bundle
   * @param array $field_list
   *
   * @return array
   */
  public function getFieldDefinitions(string $entity_type, string $bundle, array $field_list) {
    $bundle_definition = [];
    $definition_props = [
      'label' => TRUE,
      'default_value' => TRUE,
      'required' => TRUE,
      'field_type' => TRUE,
    ];
    $all_definitions = $this->entityFieldManager->getFieldDefinitions($entity_type, $bundle);
    foreach ($all_definitions as $key => $definition) {
      if (in_array($key, $field_list)) {
        $storage_definition = $definition->getFieldStorageDefinition();
        $bundle_definition[$key] = array_intersect_key($definition->toArray(), $definition_props) + ['settings' => $storage_definition->getSettings()];
      }
    }
    return $bundle_definition;
  }

  /**
   * Date String timezone conversion.
   *
   * @param string $date
   *   A string containing a formatted date in UTC, e.g. "2018-03-01T12:10:00".
   *
   * @return string
   *   A string containing a formatted date in the user's timezone, e.g.
   *   "2018-03-01T14:10:00".
   */
  protected function convertDateStringToUserTimezone(string $date) {
    $tz = drupal_get_user_timezone();
    $dt = new DrupalDateTime($date, new \DateTimeZone('UTC'));
    $dt->setTimezone(new \DateTimeZone($tz));
    return $dt->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT);
  }

}
