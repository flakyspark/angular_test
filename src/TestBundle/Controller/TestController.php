<?php

namespace TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\User\User;
use TestBundle\Entity\Result;
use TestBundle\Entity\Vocabulary;
use TestBundle\Entity\WrongStat;
/**
 * Main controller.
 *
 * @Route("/main")
 */
class TestController extends Controller
{

    /**
     * Сброс информаци пользователя
     *
     * @Route("/reset_user", name="reset_user")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function resetUserAction(Request $request) {
        $session = $request->getSession();
        $session->set('words', array(0));

        return new JsonResponse([
            'status'    => true
        ]);
    }

    /**
     * Получение набора слов
     *
     * @Route("/getwords", name="getwords")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function getWordsAction(Request $request) {
        $status = true;
        $data = '';

        $session = $request->getSession();
        $wordsCurrentUser = $session->get('words');
        if(empty($wordsCurrentUser) || !is_array($wordsCurrentUser)) {
            $wordsCurrentUser = array(0);
        }

        $repository = $this->getDoctrine()->getRepository('TestBundle:Vocabulary');
        $wordStep = $repository->getNextWord($wordsCurrentUser);

        if($wordStep) {
            $choices = $repository->getChoices($wordStep[0]['id']);
            if($choices) {
                $response = $this->formResponse($wordStep, $choices);
                $data = $response;
                $wordsCurrentUser[] = $wordStep[0]['id'];
                $session->set('words', $wordsCurrentUser);
            } else {
                $status = false;
            }
        } elseif($wordStep === false) {
            $status = false;
        } elseif(empty($wordStep)) {
            $status = true;
            $data = 'end';
        }

        return new JsonResponse([
            'status' => $status,
            'data' => $data
        ]);
    }

    /**
     * Засчитать ошибку
     *
     * @Route("/add_error", name="add_error")
     * @Method("POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function addError(Request $request) {
        $data = json_decode($request->getContent(), true);

        if(empty($data['wordId']) || empty($data['errorId'])) {
            return new JsonResponse([
                'status' => false,
            ]);
        }

        $em = $this->getDoctrine()->getManager();
        $error = $em->getRepository('TestBundle:WrongStat')->findOneBy(
            array('word' => $data['wordId'], 'translation' => $data['errorId'])
        );

        if($error) {
            $newCount = $error->getCount() + 1;
            $error->setCount($newCount);
        } else {
            $error = new WrongStat();
            $error->setWord($data['wordId']);
            $error->setTranslation($data['errorId']);
            $error->setCount(1);
            $em->persist($error);
        }

        $em->flush();

        return new JsonResponse([
            'status' => true,
        ]);
    }

    /**
     * Обновление статистики пользователей
     *
     * @Route("/add_result", name="add_result")
     * @Method("POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function addUserStat(Request $request) {
        $data = json_decode($request->getContent(), true);

        if(empty($data['username'])) {
            return new JsonResponse([
                'status' => false,
            ]);
        }

        $em = $this->getDoctrine()->getManager();

        $userStat = new Result();
        $userStat->setUsername($data['username']);
        $userStat->setScore($data['points']);

        $em->persist($userStat);
        $em->flush();

        return new JsonResponse([
            'status' => true,
        ]);
    }

    private function formResponse($word, $choices) {
        $response['rightChoice'] = $word[0]['id'];

        $lang = array(0 => 'rus', 1 => 'eng');
        $translate = array('rus' => 'eng', 'eng' => 'rus');
        $selectedLang = $lang[rand(0,1)];

        $response['word'] = $word[0][$selectedLang];

        $response['choices'][] = array(
            'id' => $word[0]['id'],
            'word' => $word[0][$translate[$selectedLang]]
        );

        foreach($choices as $choice) {
            $response['choices'][] = array(
                'id' => $choice['id'],
                'word' => $choice[$translate[$selectedLang]]
            );
        }

        shuffle($response['choices']);

        return $response;
    }
}